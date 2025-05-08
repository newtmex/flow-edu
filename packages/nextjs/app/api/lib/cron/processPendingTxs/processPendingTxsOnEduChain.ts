import { bridgeEDUChainToArbitrum } from "../../bridge";
import { handleBridgingFromChain } from "./helpres";
import { asc, eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { Origin, TxStatus, txsOnEduChain } from "~~/drizzle/schema";

export default async function () {
  await handleBridgingFromChain({
    getPendingTxs: () =>
      db
        .select({
          txHash: txsOnEduChain.txHash,
          to: txsOnEduChain.to,
          ca: txsOnEduChain.ca,
          from: txsOnEduChain.from,
          value: txsOnEduChain.value,
        })
        .from(txsOnEduChain)
        .where(eq(txsOnEduChain.status, TxStatus.Pending))
        .limit(10)
        .orderBy(asc(txsOnEduChain.createdAt)),

    updateTxStatus: (txHash, status) =>
      db.update(txsOnEduChain).set({ status }).where(eq(txsOnEduChain.txHash, txHash)),

    origin: Origin.EDUChain,
    bridgeFn: bridgeEDUChainToArbitrum,
  });
}
