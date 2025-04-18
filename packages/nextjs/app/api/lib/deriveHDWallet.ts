import { HDNodeWallet, Wallet } from "ethers";
import { getAddress } from "viem";

const MASTER_MNEMONIC = process.env.HD_WALLET_MNEMONIC!;
if (!MASTER_MNEMONIC) {
  throw new Error("HD_WALLET_MNEMONIC is not defined");
}

/**
 * Converts an EVM address to a uint256-like bigint,
 * emulating Solidity's `uint256(uint160(address))`.
 */
function addressToUint256(address: string): bigint {
  const normalized = getAddress(address).toLowerCase(); // normalize and strip checksum
  return BigInt(normalized); // hex string to bigint
}

/**
 * Derives a deterministic child HD wallet from a user address.
 * The same user address will always yield the same child wallet.
 */
export function deriveHDWalletFromAddress(address: string): HDNodeWallet {
  const hdNode = HDNodeWallet.fromPhrase(MASTER_MNEMONIC);

  // Convert address to an index (hardened for safety)
  const index = addressToUint256(address) % BigInt(2 ** 31); // stay within BIP32 bounds

  // Hardened derivation to avoid leaking parent key data
  const hardenedIndex = Number(index) + 2 ** 31;

  return hdNode.deriveChild(hardenedIndex);
}
