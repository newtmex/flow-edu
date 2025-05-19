import { createPublicClient, createWalletClient, defineChain, http } from "viem";
import { bsc } from "viem/chains";

// --- Load and validate environment variables ---
const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required environment variable: ${key}`);
  return value;
};

const BSC_RPC = getEnvVar("BSC_RPC");
const EDU_RPC = getEnvVar("EDU_RPC");
const ARB_RPC = getEnvVar("ARB_RPC");

// --- BSC Clients ---
const bscTransport = http(BSC_RPC);
export const bscClient = createPublicClient({ transport: bscTransport });
export const bscWalletClient = createWalletClient({ chain: bsc, transport: bscTransport });

// --- EDU Chain Clients ---
const eduTransport = http(EDU_RPC);
export const eduClient = createPublicClient({ transport: eduTransport });
export const eduWalletClient = createWalletClient({
  chain: defineChain({
    id: 41923,
    name: "EDU Chain",
    nativeCurrency: { decimals: 18, name: "EDU Token", symbol: "EDU" },
    rpcUrls: {
      default: { http: [EDU_RPC] },
    },
  }),
  transport: eduTransport,
});

// --- Arbitrum Clients ---
const arbTransport = http(ARB_RPC);
export const arbClient = createPublicClient({ transport: arbTransport });
export const arbWalletClient = createWalletClient({
  chain: defineChain({
    id: 42161,
    name: "Arbitrum",
    nativeCurrency: { decimals: 18, name: "ETH", symbol: "ETH" },
    rpcUrls: {
      default: { http: [ARB_RPC] },
    },
  }),
  transport: arbTransport,
});
