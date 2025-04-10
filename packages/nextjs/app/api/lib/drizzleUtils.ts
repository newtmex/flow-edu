import { normalizeAddress } from "./helpers";
import { isAddress } from "viem";

export const normalizeAddresses = <const T>(obj: T, normalizer = normalizeAddress): T => {
  if (typeof obj === "string" && isAddress(obj)) {
    return normalizer(obj) as T;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => normalizeAddresses(item, normalizer)) as T;
  }

  if (typeof obj === "object" && obj !== null) {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, normalizeAddresses(value, normalizer)]),
    ) as T;
  }

  return obj;
};
