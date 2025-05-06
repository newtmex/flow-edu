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

const arbTransport = http("https://arb1.arbitrum.io/rpc");
export const arbClient = createPublicClient({ transport: arbTransport });
export const arbWalletClient = createWalletClient({
  chain: defineChain({
    id: 42161,
    name: "Arbitrum",
    nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" },
    rpcUrls: {
      default: { http: [""] },
    },
  }),
  transport: arbTransport,
});
