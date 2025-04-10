import { createPublicClient, createWalletClient, defineChain, http } from "viem";
import { bsc } from "viem/chains";

const bscTransport = http("bsc-dataseed4.binance.org");
export const bscClient = createPublicClient({ transport: bscTransport });
export const bscWalletClient = createWalletClient({ chain: bsc, transport: bscTransport });

const eduTransport = http("https://rpc.edu-chain.raas.gelato.cloud");
export const eduClient = createPublicClient({ transport: eduTransport });
export const eduWalletClient = createWalletClient({
  chain: defineChain({
    id: 41923,
    name: "EDU Chain",
    nativeCurrency: { decimals: 18, name: "EDU Token", symbol: "EDU" },
    rpcUrls: {
      default: { http: [""] },
    },
  }),
  transport: eduTransport,
});
