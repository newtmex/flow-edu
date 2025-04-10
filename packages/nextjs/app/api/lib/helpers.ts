import { bscClient, bscWalletClient, eduClient, eduWalletClient } from "./clients";
import { centralAccount } from "./config";
import { Address, parseEther } from "viem";

// Config
const MIN_BOUND_WALLET_GAS = parseEther("0.004");
const MAX_GAS_SUBSIDY = parseEther("0.012");

export const trySendBNBGas = async (to: Address) => {
  const balance = await bscClient.getBalance({ address: to });

  // Only send if balance is below MIN_BOUND_WALLET_GAS
  if (balance >= MIN_BOUND_WALLET_GAS) return;

  // Send either the missing amount or SMALL_TOP_UP, whichever is smaller
  const refillAmount = MAX_GAS_SUBSIDY - balance;
  if (refillAmount <= 0n) return; // Already has enough or close to max

  await bscWalletClient.sendTransaction({
    account: centralAccount,
    to,
    value: refillAmount,
  });
};

export const trySendEDUGas = async (to: Address) => {
  const balance = await eduClient.getBalance({ address: to });

  // Only send if balance is below MIN_BOUND_WALLET_GAS
  if (balance >= MIN_BOUND_WALLET_GAS) return;

  // Send either the missing amount or SMALL_TOP_UP, whichever is smaller
  const refillAmount = MAX_GAS_SUBSIDY - balance;
  if (refillAmount <= 0n) return; // Already has enough or close to max

  await eduWalletClient.sendTransaction({
    account: centralAccount,
    to,
    value: refillAmount,
  });
};
