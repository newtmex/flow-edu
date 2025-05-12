import { isAddress } from "viem";
import { privateKeyToAccount } from "viem/accounts";

if (!process.env.PRIVATE_KEY) {
  throw new Error("Private key is not set");
}

export const centralAccount = privateKeyToAccount(process.env.PRIVATE_KEY as any);
export const feeCollectorAddress = centralAccount.address;

if (!isAddress(feeCollectorAddress)) {
  throw new Error("Fee collector address is not valid");
}
