import { bridgeArbitrumToBsc, bridgeEDUOnArbToEduChain, claimEDUOnArbitrum } from "../../bridge";
import { eduTokenAddressOnArb } from "../../constants";
import { normalizeAddresses } from "../../drizzleUtils";
import { and, eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { Origin, TxStatus, txsOnArb, walletBindings } from "~~/drizzle/schema";

// fetch up to N pending txs
async function fetchPending(origin: Origin, limit = 10) {
  const rows = await db
    .select()
    .from(txsOnArb)
    .where(and(eq(txsOnArb.status, TxStatus.Pending), eq(txsOnArb.origin, origin)))
    .limit(limit);

  return normalizeAddresses(rows);
}

// update only status & arbHash & timestamp
async function updateStatus(originHash: string, status: TxStatus, arbHash: string[] | null = null) {
  await db
    .update(txsOnArb)
    .set({
      status,
      arbHash: arbHash ?? [],
      updatedAt: new Date(),
    })
    .where(eq(txsOnArb.originHash, originHash));
}

// core per-tx processing
async function processTx(tx: Awaited<ReturnType<typeof fetchPending>>[0]) {
  // find bound wallet
  const wallet = await db.query.walletBindings.findFirst({
    where: eq(walletBindings.userAddress, tx.to),
  });

  if (!wallet?.signature) {
    console.info(`Ignoring unbound tx ${tx.originHash}`);
    return updateStatus(tx.originHash, TxStatus.Ignored, tx.arbHash);
  }

  // ensure we have at least one arbHash before marking Handled
  const recordHandled = async (hashes: string[]) => {
    console.info(`✅ Completed ${tx.originHash}:`, hashes);
    await updateStatus(tx.originHash, TxStatus.Handled, hashes);
  };

  // branch by origin
  if (tx.origin === Origin.BSC) {
    if (tx.arbHash?.length) return; // already bridged

    const toEduHash = await bridgeEDUOnArbToEduChain(tx.to, BigInt(tx.value));
    if (toEduHash) {
      await recordHandled([toEduHash]);
    }
  } else if (tx.origin === Origin.EDUChain) {
    // step 1: ensure claim on Arbitrum
    const hashes = tx.arbHash ?? [];
    if (!hashes.length) {
      const claimHash = await claimEDUOnArbitrum(tx.originHash);
      if (!claimHash) return;
      hashes.push(claimHash);
      await updateStatus(tx.originHash, TxStatus.Pending, hashes);
    }

    // step 2: bridge onward to BSC
    const toBscHash = await bridgeArbitrumToBsc(tx.to, BigInt(tx.value), eduTokenAddressOnArb);
    if (toBscHash) {
      hashes.push(toBscHash);
      await recordHandled(hashes);
    }
  }
}

// main loop
export default async function () {
  let lastPendingKey = "";
  while (true) {
    const pending = await Promise.all([fetchPending(Origin.BSC), fetchPending(Origin.EDUChain)]).then(r => r.flat());
    if (!pending.length) break;

    const currentPendingKey = pending
      .map(tx => tx.originHash)
      .sort()
      .join(",");
    if (currentPendingKey === lastPendingKey) {
      console.warn("🔁 Identical pending set detected. Exiting loop.");
      break;
    }

    lastPendingKey = currentPendingKey;

    // process in sequence (to simplify per-tx db transactions/logging)
    for (const tx of pending) {
      try {
        await processTx(tx);
      } catch (err) {
        console.error(`❌ Error processing ${tx.originHash}`, err);
        // optionally mark failed
        await updateStatus(tx.originHash, TxStatus.Failed);
      }
    }
  }
}
