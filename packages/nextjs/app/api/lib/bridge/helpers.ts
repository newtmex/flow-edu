import { bscClient, bscWalletClient, eduClient, eduWalletClient } from "../clients";
import { centralAccount } from "../config";
import { Address, parseEther } from "viem";

/**
 * Configuration for sending gas on a specific chain.
 */
export type ChainGasConfig = {
  /** Friendly name of the chain (used in logging and errors) */
  name: string;

  /** Minimum native token balance required for the target address */
  minGas: bigint;

  /** Public client capable of checking balances and waiting for receipts */
  client: {
    getBalance: (args: { address: Address }) => Promise<bigint>;
    waitForTransactionReceipt: (args: {
      hash: `0x${string}`;
      confirmations?: number;
    }) => Promise<{ status: "success" | "reverted" | "rejected" | string }>;
  };

  /** Wallet client used to send native token from central account */
  walletClient: {
    sendTransaction: (args: { account: typeof centralAccount; to: Address; value: bigint }) => Promise<`0x${string}`>;
  };

  /** Optional number of confirmations to wait for (defaults to 1 if not provided) */
  confirmations?: number;
};

/**
 * Sends native gas (e.g., BNB, EDU) to a target address if its balance is below the configured threshold.
 *
 * @param to - Address to check and potentially fund
 * @param config - Chain-specific configuration
 */
export const trySendGas = async (to: Address, config: ChainGasConfig) => {
  const { name, minGas, client, walletClient, confirmations } = config;

  const balance = await client.getBalance({ address: to });
  if (balance >= minGas) return;

  const refillAmount = minGas - balance;
  if (refillAmount <= 0n) return;

  const txHash = await walletClient.sendTransaction({
    account: centralAccount,
    to,
    value: refillAmount,
  });

  const txReceipt = await client.waitForTransactionReceipt({
    hash: txHash,
    confirmations,
  });

  if (txReceipt.status !== "success") {
    console.error(`Failed to send ${name} gas:`, txReceipt);
    throw new Error(`Failed to send ${name} gas`);
  }

  console.log(`Sent ${name} gas:`, txHash);
};

/**
 * Attempts to send BNB to a wallet if its balance is below 0.0006 BNB.
 *
 * Waits for 3 confirmations to ensure finality.
 *
 * @param to - Recipient wallet address
 */
export const trySendBNBGas = async (to: string) =>
  trySendGas(to, {
    name: "BNB",
    minGas: parseEther("0.0006"),
    client: bscClient,
    walletClient: bscWalletClient,
    confirmations: 3,
  });

/** Minimum EDU required in a bound wallet for EDU Chain operations */
export const MIN_EDU_BOUND_WALLET_GAS = parseEther("0.004");

/**
 * Attempts to send EDU gas to a wallet if its balance is below 0.004 EDU.
 *
 * @param to - Recipient wallet address
 */
export const trySendEDUGas = async (to: string) =>
  trySendGas(to, {
    name: "EDU",
    minGas: MIN_EDU_BOUND_WALLET_GAS,
    client: eduClient,
    walletClient: eduWalletClient,
  });
