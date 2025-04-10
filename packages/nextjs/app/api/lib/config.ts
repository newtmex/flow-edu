import { isAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export const centralAccount = privateKeyToAccount(process.env.PRIVATE_KEY! as any);
export const feeCollectorAddress = process.env.FEE_COLLECTOR! as `0x${string}`;

if (!process.env.PRIVATE_KEY) {
  throw new Error("Private key is not set");
}

if (!isAddress(feeCollectorAddress)) {
  throw new Error("Fee collector address is not valid");
}
