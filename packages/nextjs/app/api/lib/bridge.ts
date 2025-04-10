import Encryption from "./Encryption";
import { bscClient, bscWalletClient, eduClient, eduWalletClient } from "./clients";
import { centralAccount, feeCollectorAddress } from "./config";
import { LAYERZERO_CHAIN_IDS } from "./constants";
import { MIN_BOUND_WALLET_GAS, trySendBNBGas, trySendEDUGas } from "./helpers";
import { encodePacked, erc20Abi, parseUnits } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import externalContracts from "~~/contracts/externalContracts";

const FEE_BPS = 30; // 0.3% == 30 basis points (1 bps = 0.01%)

export const bridgeBscToArbitrum = async (boundWalletEncryptedPrivKey: string, tokenAddress: string) => {
  const boundWallet = privateKeyToAccount(Encryption.new().decryptCipherText(boundWalletEncryptedPrivKey) as any);
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

  const fee = (balance * BigInt(FEE_BPS)) / 10000n;
  const amountToBridge = balance - fee;

  await trySendBNBGas(boundWallet.address);

  // Approve tokens to ProxyOFT
  await bscWalletClient.writeContract({
    account: boundWallet,
    abi: erc20Abi,
    address: tokenAddress,
    functionName: "approve",
    args: [proxyOFT.address, amountToBridge],
  });

  // Build adapterParams
  const version = 2; // adapterParams version
  const gasLimit = 500_000n; // Destination gas limit
  const unknownNumber = 128000000000000000000n; // Native fee for the transaction
  const recipient = centralAccount.address;

  const adapterParams = encodePacked(
    ["uint16", "uint256", "uint256", "address"],
    [version, gasLimit, unknownNumber, recipient],
  );

  const [nativeFee, zroFee] = await bscClient.readContract({
    abi: proxyOFT.abi,
    address: proxyOFT.address,
    functionName: "estimateSendFee",
    args: [dstChainId, recipient, amountToBridge, true, adapterParams],
  });

  const hash = await bscWalletClient.writeContract({
    account: boundWallet,
    abi: proxyOFT.abi,
    address: proxyOFT.address,
    functionName: "sendFrom",
    args: [
      boundWallet.address, // sender
      dstChainId, // dstChainId
      recipient, // recipient on Arbitrum
      amountToBridge, // amount to send
      { refundAddress: boundWallet.address, zroPaymentAddress: recipient, adapterParams }, // refundAddress, zroPaymentAddress, adapterParams
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

  return hash;
};

export const bridgeEDUChainToArbitrum = async (boundWalletEncryptedPrivKey: string, tokenAddress: string | null) => {
  const boundWallet = privateKeyToAccount(Encryption.new().decryptCipherText(boundWalletEncryptedPrivKey) as any);
  const [balance, decimals] = await Promise.all([
    !tokenAddress
      ? eduClient.getBalance({ address: boundWallet.address })
      : eduClient.readContract({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [boundWallet.address],
        }),
    !tokenAddress
      ? 18
      : bscClient.readContract({
          address: tokenAddress,
          abi: erc20Abi,
          functionName: "decimals",
        }),
  ]);

  if (balance < parseUnits("1", decimals)) return null;

  // ERC20 bridging on EDUChain not supported yet
  if (tokenAddress) return null;

  await trySendEDUGas(boundWallet.address);

  const fee = (balance * BigInt(FEE_BPS)) / 10_000n;
  const arbSys = externalContracts["41923"].ArbSys;
  let amountToBridge = balance - fee - MIN_BOUND_WALLET_GAS;

  // Estimate gas usage for withdrawEth
  const withdrawGas = await eduClient.estimateContractGas({
    account: boundWallet,
    abi: arbSys.abi,
    address: arbSys.address,
    functionName: "withdrawEth",
    args: [centralAccount.address],
    value: amountToBridge, // worst case
  });
  // Estimate gas usage for fee transfer
  const feeTransferGas = await eduClient.estimateGas({
    account: boundWallet,
    to: feeCollectorAddress,
    value: fee,
  });
  const gasPrice = await eduClient.getGasPrice();
  const totalGasCost = (withdrawGas + feeTransferGas) * gasPrice;

  amountToBridge -= totalGasCost;

  if (amountToBridge <= 0n) return null;

  // Withdraw to central account
  const hash = await eduWalletClient.writeContract({
    account: boundWallet,
    abi: arbSys.abi,
    address: arbSys.address,
    functionName: "withdrawEth",
    args: [centralAccount.address],
    value: amountToBridge,
  });

  // Send fee to fee collector
  await eduWalletClient.sendTransaction({
    to: feeCollectorAddress,
    account: boundWallet,
    value: fee,
  });

  return hash;
};
