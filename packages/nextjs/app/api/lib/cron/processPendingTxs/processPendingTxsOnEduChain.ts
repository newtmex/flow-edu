import { bridgeEDUChainToArbitrum } from "../../bridge";
import { handleBridgingFromOriginChain } from "./helpres";
import { Origin } from "~~/drizzle/schema";

export default async function () {
  await handleBridgingFromOriginChain({
    origin: Origin.EDUChain,
    bridgeFn: bridgeEDUChainToArbitrum,
  });
}
