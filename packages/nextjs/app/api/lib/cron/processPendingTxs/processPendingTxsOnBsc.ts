import { bridgeBscToArbitrum } from "../../bridge";
import { handleBridgingFromChain } from "./helpres";
import { eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { Origin, TxStatus, txsOnBsc } from "~~/drizzle/schema";

export default async function () {
  await handleBridgingFromChain({
    getPendingTxs: () =>
      db
        .select({
          txHash: txsOnBsc.txHash,
          to: txsOnBsc.to,
          ca: txsOnBsc.ca,
          from: txsOnBsc.from,
          value: txsOnBsc.value,
        })
        .from(txsOnBsc)
        .where(eq(txsOnBsc.status, TxStatus.Pending))
        .limit(10),

    updateTxStatus: (txHash, status) => db.update(txsOnBsc).set({ status }).where(eq(txsOnBsc.txHash, txHash)),

    bridgeFn: bridgeBscToArbitrum,
    origin: Origin.BSC,
  });
}
