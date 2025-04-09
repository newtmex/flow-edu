import { createPublicClient, createWalletClient, http } from "viem";
import { bsc } from "viem/chains";

export const bscClient = createPublicClient({ transport: http("bsc-dataseed4.binance.org") });
export const bscWalletClient = createWalletClient({ chain: bsc, transport: http("bsc-dataseed4.binance.org") });
