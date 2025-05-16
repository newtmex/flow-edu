import { Address, bytesToHex, getAddress, hexToBytes, isAddress } from "viem";

/**
 * Lowercases and formats a valid address.
 */
export const normalizeAddress = (address: string): Address => getAddress(address).toLowerCase();

/**
 * Strip right- zero padding from a 32-byte hex string, then
 * return a normalized (lowercased, checksummed) 20-byte address.
 */
export function bytes32ToNormalizedAddress(input: string): string {
  // 1) If it’s already a valid address, just normalize it.
  if (/^0x[0-9A-Fa-f]{40}$/.test(input)) {
    return normalizeAddress(input);
  }

  // 2) Must be exactly 66 chars: “0x” + 64 hex
  if (!/^0x[0-9a-fA-F]{64}$/.test(input)) {
    throw new Error(`Invalid bytes32 hex string: ${input}`);
  }

  const raw = hexToBytes(input as any);

  // 3) Try left-padded: take bytes[12..31]
  const left = raw.slice(12, 32);
  const leftHex = bytesToHex(left);
  if (isAddress(leftHex)) {
    return normalizeAddress(leftHex);
  }

  // // 4) Try right-padded: take bytes[0..19]
  // const right = raw.slice(0, 20);
  // const rightHex = bytesToHex(right);
  // const isRightPadded = input
  //   .slice(-24)
  //   .split("")
  //   .every(c => c === "0");
  // if (isRightPadded && isAddress(rightHex)) {
  //   return normalizeAddress(rightHex);
  // }

  throw new Error(`Cannot extract a 20-byte address from ${input}`);
}
