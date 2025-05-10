import { bridgeBscToArbitrum } from "../../bridge";
import { handleBridgingFromOriginChain } from "./helpres";
import { Origin } from "~~/drizzle/schema";

export default async function () {
  await handleBridgingFromOriginChain({
    bridgeFn: bridgeBscToArbitrum,
    origin: Origin.BSC,
  });
}
