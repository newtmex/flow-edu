import Encryption from "./Encryption";
import { bscClient, bscWalletClient } from "./clients";
import { centralAccount } from "./config";
import { LAYERZERO_CHAIN_IDS } from "./constants";
import { trySendBNBGas } from "./helpers";
import { encodePacked, erc20Abi, pad, parseEther, parseUnits, toHex } from "viem";
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

  return hash;
};
