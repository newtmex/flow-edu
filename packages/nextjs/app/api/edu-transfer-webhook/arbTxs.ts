import { eduTokenAddressOnArb } from "../lib/constants";
import { getArbTxRowStatus, tryUpdateTxOrigin } from "../lib/cron/processPendingTxs/processPendingTxsOnArb";
import { and, asc, eq } from "drizzle-orm";
import { isAddressEqual } from "viem";
import externalContracts from "~~/contracts/externalContracts";
import { db } from "~~/drizzle/db";
import { Origin, TxStatus, txsOnArb, walletBindings } from "~~/drizzle/schema";

export const {
  ERC20Outbox: { address: outbox },
  ERC20Inbox: { address: inbox },
} = externalContracts["42161"];

type Match = { id: number; originHash: string | null; arbHash: string[] | null; status: TxStatus };

const isOutbox = (ca: string) => isAddressEqual(ca, outbox);

// 3) Configuration for each “ca” check
const handlers = [
  {
    // EDUChain → BSC claim transaction on the Outbox
    matchCa: isOutbox,
    origin: Origin.EDUChain,
    computeNewHashes: (row: Match, txHash: string) => (row.arbHash?.length ? row.arbHash : [txHash]),
  },
  {
    // BSC → EDUChain arrives on the Inbox
    matchCa: (ca: string) => isAddressEqual(ca, inbox),
    origin: Origin.BSC,
    computeNewHashes: (row: Match, txHash: string) => (row.arbHash?.length ? row.arbHash : [txHash]),
  },
  {
    // EDUChain → BSC final token transfer on the EDU token contract
    matchCa: (ca: string) => isAddressEqual(ca, eduTokenAddressOnArb),
    origin: Origin.EDUChain,
    computeNewHashes: (row: Match, txHash: string) => {
      const prev = row.arbHash ?? [];
      // only push second hash if not already present
      if (prev.length === 1) {
        return [...prev, txHash];
      }
      return prev;
    },
  },
];

// 4) Main logic
export default async function handleArbTxs({
  ca,
  valueRecipient,
  txHash,
  valueSender,
  value,
}: {
  ca: string;
  txHash: string;
  valueRecipient: string;
  valueSender: string;
  value: string;
}) {
  const filter = isOutbox(ca)
    ? eq(walletBindings.flowEDUAddress, valueSender)
    : eq(walletBindings.userAddress, valueRecipient);
  const boundWallet = await db
    .select({ signature: walletBindings.signature, userAddress: walletBindings.userAddress })
    .from(walletBindings)
    .where(filter)
    .limit(1)
    .then(r => r.at(0));

  if (!boundWallet) return;

  for (const h of handlers) {
    if (!h.matchCa(ca)) continue;

    const findRow = () =>
      db
        .select({
          originHash: txsOnArb.originHash,
          arbHash: txsOnArb.arbHash,
          id: txsOnArb.id,
          status: txsOnArb.status,
          origin: txsOnArb.origin,
          value: txsOnArb.value,
        })
        .from(txsOnArb)
        .where(
          and(eq(txsOnArb.origin, h.origin), eq(txsOnArb.valueRecipient, valueRecipient), eq(txsOnArb.value, value)),
        )
        .limit(1)
        .orderBy(asc(txsOnArb.createdAt))
        .then(r => r.at(0));
    const insertRowAndGetRow = () =>
      db
        .insert(txsOnArb)
        .values({
          origin: h.origin,
          valueRecipient,
          valueSender,
          value,
        })
        .returning()
        .then(r => r[0]);

    try {
      let row = (await findRow()) || (await insertRowAndGetRow());
      if (row.status != TxStatus.Handled) {
        const newHashes = h.computeNewHashes(row, txHash);

        // only write if hashes changed
        if (newHashes.length !== (row.arbHash?.length || 0) || newHashes.some((h, i) => row.arbHash?.[i] !== h)) {
          row = await db
            .update(txsOnArb)
            .set({
              arbHash: newHashes,
              updatedAt: new Date(),
              status: row.originHash ? getArbTxRowStatus(row) : TxStatus.Pending,
            })
            .where(eq(txsOnArb.id, row.id))
            .returning()
            .then(r => r[0]);
        }

        if (!row.originHash) {
          await tryUpdateTxOrigin(row).then(newRow => {
            if (newRow) {
              row = newRow;
            }
          });
        }
      }
    } catch (error) {
      console.log("Error on hash", txHash, error);
    }
    // once handled, stop checking other handlers
    break;
  }
}
