import { ArbitrumNetwork, registerCustomArbitrumNetwork } from "@arbitrum/sdk";
import { JsonRpcProvider } from "@ethersproject/providers";

export const eduChainNetwork: ArbitrumNetwork = {
  name: "EDU Chain",
  chainId: 41923,
  parentChainId: 42161,
  ethBridge: {
    bridge: "0x2F12c50b46adB01a4961AdDa5038c0974C7C78e8",
    inbox: "0x590044e628ea1B9C10a86738Cf7a7eeF52D031B8",
    outbox: "0x6339965Cb3002f5c746895e4eD895bd775dbfdf9",
    rollup: "0xBaE3B462a2A7fb758F66D91170514C10B14Ce914",
    sequencerInbox: "0xA3464bf0ed52cFe6676D3e34ab1F4DF53f193631",
  },
  tokenBridge: {
    parentGatewayRouter: "0xDa4ac9E9cB8Af8afBB2Df1ffe7b82efEA17ba0f6",
    childGatewayRouter: "0xFd25B25576cC0d510F62C88A166F84b3e25208C7",
    parentErc20Gateway: "0x9132151475ACCf0662C545Bc81FbC1741d978EE0",
    childErc20Gateway: "",
    parentCustomGateway: "0xDd7A9dEcBB0b16B37fE6777e245b18fC0aC63759",
    childCustomGateway: "0xA9f18587F6dE8B1c89a4AdD2c953AB66eD532015",
    parentWethGateway: "0x0000000000000000000000000000000000000000",
    childWethGateway: "0x0000000000000000000000000000000000000000",
    parentWeth: "0x0000000000000000000000000000000000000000",
    childWeth: "0x0000000000000000000000000000000000000000",
    parentMultiCall: "0x90B02D9F861017844F30dFbdF725b6aa84E63822",
    childMultiCall: "0xB9199cA38F678bE120350d1baEE8a7b8eCd52A06",
  },
  retryableLifetimeSeconds: 604800, // 7 days:contentReference[oaicite:19]{index=19}
  confirmPeriodBlocks: 45818, // ~6.4 days (Arbitrum One default):contentReference[oaicite:20]{index=20}
  nativeToken: "EDU",
  isTestnet: false,
  isCustom: true,
};

registerCustomArbitrumNetwork(eduChainNetwork);

export const eduChainProvider = new JsonRpcProvider({ url: process.env.EDU_RPC!, skipFetchSetup: true });
export const arbProvider = new JsonRpcProvider(
  { url: "https://arb1.arbitrum.io/rpc", skipFetchSetup: true },
  { chainId: 42161, name: "Arbitrum One" },
);
