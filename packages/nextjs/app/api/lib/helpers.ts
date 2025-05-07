import { bscClient, bscWalletClient, eduClient, eduWalletClient } from "./clients";
import { centralAccount } from "./config";
import { Address, parseEther } from "viem";

// Config
export const MIN_BOUND_WALLET_GAS = parseEther("0.004");
const MAX_GAS_SUBSIDY = parseEther("0.00012");

export const trySendBNBGas = async (to: Address) => {
  const balance = await bscClient.getBalance({ address: to });

  // Only send if balance is below MIN_BOUND_WALLET_GAS
  if (balance >= MIN_BOUND_WALLET_GAS) return;

  // Send either the missing amount or SMALL_TOP_UP, whichever is smaller
  const refillAmount = MAX_GAS_SUBSIDY - balance;
  if (refillAmount <= 0n) return; // Already has enough or close to max

  const txHash = await bscWalletClient.sendTransaction({
    account: centralAccount,
    to,
    value: refillAmount,
  });

  const txReceipt = await bscClient.waitForTransactionReceipt({ hash: txHash });
  if (txReceipt.status !== "success") {
    console.error("Failed to send BNB gas:", txReceipt);
    throw new Error("Failed to send BNB gas");
  }
  console.log("Sent BNB gas:", txHash);
};

export const trySendEDUGas = async (to: Address) => {
  const balance = await eduClient.getBalance({ address: to });

  // Only send if balance is below MIN_BOUND_WALLET_GAS
  if (balance >= MIN_BOUND_WALLET_GAS) return;

  // Send either the missing amount or SMALL_TOP_UP, whichever is smaller
  const refillAmount = MAX_GAS_SUBSIDY - balance;
  if (refillAmount <= 0n) return; // Already has enough or close to max

  const txHash = await eduWalletClient.sendTransaction({
    account: centralAccount,
    to,
    value: refillAmount,
  });

  const txReceipt = await eduClient.waitForTransactionReceipt({ hash: txHash });
  if (txReceipt.status !== "success") {
    console.error("Failed to send EDU gas:", txReceipt);
    throw new Error("Failed to send EDU gas");
  }
  console.log("Sent EDU gas:", txHash);
};

export const normalizeAddress = (address: string): Address => address.toLowerCase();
