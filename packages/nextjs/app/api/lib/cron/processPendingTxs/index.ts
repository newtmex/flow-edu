import { acquireLock, releaseLock } from "../lock";
import processPendingTxsOnArb from "./processPendingTxsOnArb";
import processPendingTxsOnBsc from "./processPendingTxsOnBsc";
import processPendingTxsOnEduChain from "./processPendingTxsOnEduChain";

export async function processPendingTxs() {
  const lockAcquired = await acquireLock();
  if (!lockAcquired) {
    return;
  }

  try {
    const results = await Promise.allSettled([
      processPendingTxsOnBsc,
      processPendingTxsOnEduChain,
      processPendingTxsOnArb,
    ]);

    results.forEach(result => {
      if (result.status === "rejected") {
        console.error("Error processing pending txs:", result.reason);
      }
    });
  } finally {
    await releaseLock();
  }
}
