import Encryption from "./Encryption";
import { arbClient, arbWalletClient, bscClient, bscWalletClient, eduClient, eduWalletClient } from "./clients";
import { centralAccount, feeCollectorAddress } from "./config";
import { LAYERZERO_CHAIN_IDS, eduTokenAddressOnArb } from "./constants";
import { MIN_BOUND_WALLET_GAS, trySendBNBGas, trySendEDUGas } from "./helpers";
import { arbProvider, eduChainNetwork, eduChainProvider } from "./providers";
import { ChildToParentMessageStatus, ChildTransactionReceipt, EthBridger } from "@arbitrum/sdk";
import { ParentToChildMessageCreator } from "@arbitrum/sdk/dist/lib/message/ParentToChildMessageCreator";
import { BigNumber } from "@ethersproject/bignumber";
import { Wallet } from "@ethersproject/wallet";
import { solidityPacked, zeroPadBytes } from "ethers";
import {
  type Hex,
  type PrivateKeyAccount,
  type PublicClient,
  encodePacked,
  erc20Abi,
  getAddress,
  parseEther,
  parseUnits,
  zeroAddress,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import externalContracts from "~~/contracts/externalContracts";

const FEE_BPS = 30n; // 0.3% fee

export async function ensureERC20AllowanceAndBalance({
  publicClient,
  walletClient,
  tokenAddress,
  account,
  spenderAddress,
  amount,
}: {
  publicClient: PublicClient;
  walletClient: typeof arbWalletClient | typeof eduWalletClient | typeof bscWalletClient;
  tokenAddress: string;
  account: PrivateKeyAccount;
  spenderAddress: string;
  amount: bigint;
}) {
  const [balance, allowance] = await Promise.all([
    publicClient.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account.address],
    }) as Promise<bigint>,
    publicClient.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "allowance",
      args: [account.address, spenderAddress],
    }) as Promise<bigint>,
  ]);

  if (balance < amount) {
    return false;
  }

  if (allowance < amount) {
    await walletClient.writeContract({
      account,
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [spenderAddress, 2n ** 251n], // large allowance
    });
  }

  return true;
}

export const bridgeBscToArbitrum = async (encryptedPrivKey: string, tokenAddress: string | null) => {
  if (!tokenAddress) return null;

  const boundWallet = privateKeyToAccount(Encryption.new().decryptCipherText(encryptedPrivKey) as Hex);

  const [balance, decimals] = await Promise.all([
    bscClient.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [boundWallet.address],
    }),
    bscClient.readContract({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "decimals",
    }),
  ]);

  if (balance < parseUnits("1", decimals)) return null;

  const proxyOFT = externalContracts["56"].ProxyOFTV2;
  const dstChainId = LAYERZERO_CHAIN_IDS.ARBITRUM;
  const fee = (balance * FEE_BPS) / 10000n;
  const amountToBridge = balance - fee;

  await trySendBNBGas(boundWallet.address);

  const allowance = await bscClient.readContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "allowance",
    args: [boundWallet.address, proxyOFT.address],
  });
  if (allowance < amountToBridge) {
    await bscWalletClient.writeContract({
      account: boundWallet,
      abi: erc20Abi,
      address: tokenAddress,
      functionName: "approve",
      args: [proxyOFT.address, 2n ** 251n],
    });
  }

  const adapterParams = encodePacked(
    ["uint16", "uint256", "uint256", "address"],
    [2, 500_000n, 0n, centralAccount.address],
  );

  const centralAccountAddressBytes32 = zeroPadBytes(getAddress(centralAccount.address), 32);

  const [nativeFee] = await bscClient.readContract({
    abi: proxyOFT.abi,
    address: proxyOFT.address,
    functionName: "estimateSendFee",
    args: [dstChainId, centralAccountAddressBytes32, amountToBridge, false, adapterParams],
  });

  const txHash = await bscWalletClient.writeContract({
    account: boundWallet,
    abi: proxyOFT.abi,
    address: proxyOFT.address,
    functionName: "sendFrom",
    args: [
      boundWallet.address,
      dstChainId,
      centralAccountAddressBytes32,
      amountToBridge,
      {
        refundAddress: boundWallet.address,
        zroPaymentAddress: centralAccount.address,
        adapterParams,
      },
    ],
    value: nativeFee,
  });

  await bscWalletClient.writeContract({
    account: boundWallet,
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "transfer",
    args: [feeCollectorAddress, fee],
  });

  return { hash: txHash, value: amountToBridge };
};

export const bridgeArbitrumToBsc = async (to: string, amount: bigint, tokenAddress: string) => {
  const wrapper = externalContracts["42161"].OFTWrapper;

  if (
    !(await ensureERC20AllowanceAndBalance({
      publicClient: arbClient,
      account: centralAccount,
      amount,
      spenderAddress: wrapper.address,
      tokenAddress,
      walletClient: arbWalletClient,
    }))
  )
    return null;

  const toBytes32 = zeroPadBytes(getAddress(to), 32);
  const adapterParams = solidityPacked(
    ["uint16", "uint256", "uint256", "address"],
    [2, 500_000n, parseEther("0.0005"), centralAccount.address],
  );

  const feeObj = {
    callerBps: 0n,
    caller: zeroAddress,
    partnerId: "0x0000",
  };

  const [nativeFee] = await arbClient.readContract({
    address: wrapper.address,
    abi: wrapper.abi,
    functionName: "estimateSendFeeV2",
    args: [tokenAddress, LAYERZERO_CHAIN_IDS.BSC, toBytes32, amount, false, adapterParams, feeObj],
  });

  const hash = await arbWalletClient.writeContract({
    account: centralAccount,
    address: wrapper.address,
    abi: wrapper.abi,
    functionName: "sendOFTV2",
    args: [
      tokenAddress,
      LAYERZERO_CHAIN_IDS.BSC,
      toBytes32,
      amount,
      (amount * 995n) / 1000n,
      {
        refundAddress: centralAccount.address,
        zroPaymentAddress: zeroAddress,
        adapterParams,
      },
      feeObj,
    ],
    value: nativeFee,
  });

  return hash;
};

export const bridgeEDUOnArbToEduChain = async (to: string, amount: bigint) => {
  const ethBridger = new EthBridger(eduChainNetwork);
  const parentSigner = new Wallet(process.env.PRIVATE_KEY!, arbProvider);

  if (
    !(await ensureERC20AllowanceAndBalance({
      publicClient: arbClient,
      account: centralAccount,
      amount,
      spenderAddress: ethBridger.childNetwork.ethBridge.inbox,
      tokenAddress: eduTokenAddressOnArb,
      walletClient: arbWalletClient,
    }))
  )
    return null;

  const sendAmount = BigNumber.from(amount);

  const { l2CallValue, maxFeePerGas, maxSubmissionCost, from, gasLimit, deposit, data } = (
    await ParentToChildMessageCreator.getTicketCreationRequest(
      {
        data: "0x",
        from: parentSigner.address,
        l2CallValue: sendAmount,
        to,
        callValueRefundAddress: parentSigner.address,
        excessFeeRefundAddress: parentSigner.address,
      },
      arbProvider,
      eduChainProvider,
    )
  ).retryableData;
  const tokenTotalFeeAmount = deposit.add(l2CallValue).add(maxSubmissionCost).add(gasLimit.mul(maxFeePerGas));

  return await arbWalletClient.writeContract({
    account: centralAccount,
    address: externalContracts["42161"].ERC20Inbox.address,
    abi: externalContracts["42161"].ERC20Inbox.abi,
    functionName: "createRetryableTicket",
    args: [
      to,
      l2CallValue.toBigInt(),
      maxSubmissionCost.toBigInt(),
      from,
      from,
      gasLimit.toBigInt(),
      maxFeePerGas.toBigInt(),
      tokenTotalFeeAmount.toBigInt(),
      data,
    ],
  });
};

export const claimEDUOnArbitrum = async (txHash: string) => {
  const receipt = await eduChainProvider.getTransactionReceipt(txHash);
  const transactionReceipt = new ChildTransactionReceipt(receipt);
  const messages = await transactionReceipt.getChildToParentMessages(
    new Wallet(process.env.PRIVATE_KEY!).connect(arbProvider),
  );

  const message = messages[0];

  try {
    const status = await message.status(eduChainProvider);
    if (status !== ChildToParentMessageStatus.CONFIRMED) return null;
  } catch (error) {
    console.error("Error checking message status:", txHash, error);
    return null;
  }

  const result = await message.execute(eduChainProvider);
  const receiptExecuted = await result.wait();
  return receiptExecuted.transactionHash;
};

export const bridgeEDUChainToArbitrum = async (encryptedPrivKey: string, tokenAddress: string | null) => {
  const boundWallet = privateKeyToAccount(Encryption.new().decryptCipherText(encryptedPrivKey) as Hex);

  const [balance, decimals] = await Promise.all([
    tokenAddress
      ? eduClient.readContract({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [boundWallet.address],
        })
      : eduClient.getBalance({ address: boundWallet.address }),
    tokenAddress
      ? bscClient.readContract({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "decimals",
        })
      : Promise.resolve(18),
  ]);

  if (balance < parseUnits("1", decimals)) return null;
  if (tokenAddress) {
    throw new Error("ERC20 not supported yet on EDU Chain");
    await trySendEDUGas(boundWallet.address);
  }

  const fee = (balance * FEE_BPS) / 10_000n;
  let amountToBridge = balance - fee - MIN_BOUND_WALLET_GAS;

  const arbSys = externalContracts["41923"].ArbSys;

  const [withdrawGas, feeTransferGas, gasPrice] = await Promise.all([
    eduClient.estimateContractGas({
      account: boundWallet,
      abi: arbSys.abi,
      address: arbSys.address,
      functionName: "withdrawEth",
      args: [centralAccount.address],
      value: amountToBridge,
    }),
    eduClient.estimateGas({
      account: boundWallet,
      to: feeCollectorAddress,
      value: fee,
    }),
    eduClient.getGasPrice(),
  ]);

  const totalGasCost = (withdrawGas + feeTransferGas) * gasPrice;
  amountToBridge -= totalGasCost;

  if (amountToBridge <= 0n) return null;

  const txHash = await eduWalletClient.writeContract({
    account: boundWallet,
    abi: arbSys.abi,
    address: arbSys.address,
    functionName: "withdrawEth",
    args: [centralAccount.address],
    value: amountToBridge,
  });

  await eduWalletClient.sendTransaction({
    to: feeCollectorAddress,
    account: boundWallet,
    value: fee,
  });

  return { hash: txHash, value: amountToBridge };
};
