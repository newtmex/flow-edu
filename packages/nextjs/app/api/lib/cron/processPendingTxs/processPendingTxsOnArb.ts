import { bridgeArbitrumToBsc, bridgeEDUOnArbToEduChain, claimEDUOnArbitrum } from "../../bridge";
import { eduTokenAddressOnArb } from "../../constants";
import { normalizeAddresses } from "../../drizzleUtils";
import { and, asc, eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { Origin, TxStatus, txsOnArb, txsOnBsc, txsOnEduChain, walletBindings } from "~~/drizzle/schema";

// fetch up to N pending txs
async function fetchPending(origin: Origin, limit = 100) {
  const rows = await db
    .select()
    .from(txsOnArb)
    .where(and(eq(txsOnArb.status, TxStatus.Pending), eq(txsOnArb.origin, origin)))
    .limit(limit);

  return normalizeAddresses(rows);
}

type PendingTx = Awaited<ReturnType<typeof fetchPending>>[0];
type TxWithOrigin = { originHash: string } & PendingTx;

// update only status & arbHash & timestamp
async function updateStatus(id: number, status: TxStatus, arbHash: string[] | null = null) {
  await db
    .update(txsOnArb)
    .set({
      status,
      arbHash: arbHash ?? [],
      updatedAt: new Date(),
    })
    .where(eq(txsOnArb.id, id));
}

// core per-tx processing
async function processTx(tx: PendingTx | TxWithOrigin) {
  if (!tx.originHash) {
    tx = (await tryUpdateTxOrigin(tx)) || tx;
  }

  if (!tx.originHash) {
    console.info(`Ignoring transaction, has no originHash ${tx.id} ${tx.origin}`);
    await updateStatus(tx.id, TxStatus.Ignored);
    return;
  }

  await processPendingTxWithOrigin(tx as TxWithOrigin);
}

async function processPendingTxWithOrigin(tx: TxWithOrigin) {
  // find bound wallet
  const wallet = await db.query.walletBindings.findFirst({
    where: eq(walletBindings.userAddress, tx.valueRecipient),
  });

  if (!wallet?.signature) {
    console.info(`Ignoring unbound tx ${tx.id} ${tx.originHash}`);
    return updateStatus(tx.id, TxStatus.Ignored, tx.arbHash);
  }

  // ensure we have at least one arbHash before marking Handled
  const recordHandled = async (hashes: string[]) => {
    console.info(`✅ Completed ${tx.originHash}:`, hashes);
    await updateStatus(tx.id, TxStatus.Handled, hashes);
  };

  // branch by origin
  if (tx.origin === Origin.BSC) {
    if (Boolean(tx.arbHash?.length)) return; // already bridged

    const toEduHash = await bridgeEDUOnArbToEduChain(tx.valueRecipient, BigInt(tx.value));
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
      await updateStatus(tx.id, TxStatus.Pending, hashes);
    }

    // step 2: bridge onward to BSC
    const toBscHash = await bridgeArbitrumToBsc(tx.valueRecipient, BigInt(tx.value), eduTokenAddressOnArb);
    if (toBscHash) {
      hashes.push(toBscHash);
      await recordHandled(hashes);
    }
  }
}

export const getArbTxRowStatus = (tx: Pick<PendingTx, "arbHash" | "origin">) =>
  !tx.arbHash?.length || (tx.arbHash.length < 2 && tx.origin == Origin.EDUChain) ? TxStatus.Pending : TxStatus.Handled;

export async function tryUpdateTxOrigin(tx: Pick<PendingTx, "arbHash" | "origin" | "value" | "status" | "id">) {
  const originTable = tx.origin == Origin.BSC ? txsOnBsc : tx.origin == Origin.EDUChain ? txsOnEduChain : undefined;
  if (originTable) {
    const originRow = await db
      .select({ hash: originTable.txHash })
      .from(originTable)
      .where(and(eq(originTable.status, TxStatus.Pending), eq(originTable.value, tx.value)))
      .orderBy(asc(originTable.createdAt))
      .limit(1)
      .then(r => r.at(0));
    if (!originRow) return null;

    tx = await db
      .update(txsOnArb)
      .set({
        originHash: originRow.hash,
        updatedAt: new Date(),
        status: getArbTxRowStatus(tx),
      })
      .where(eq(txsOnArb.id, tx.id))
      .returning()
      .then(r => r[0]);

    if (tx.status == TxStatus.Handled) return null;
  }

  return tx as TxWithOrigin;
}

async function processPerOrigin(origin: Origin) {
  let lastPendingKey = "";
  while (true) {
    const pending = await fetchPending(origin);
    if (!pending.length) break;

    const currentPendingKey = pending
      .map(tx => tx.originHash)
      .sort()
      .join(",");
    if (currentPendingKey === lastPendingKey) {
      const [tx] = pending;
      console.warn("🔁 Arb Identical pending set detected. Exiting loop.", tx.originHash, tx.origin);
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
        // await updateStatus(tx.originHash, TxStatus.Failed);
      }
    }
  }
}

// main loop
export default async function () {
  await Promise.all([Origin.BSC, Origin.EDUChain].map(origin => processPerOrigin(origin)));
}
