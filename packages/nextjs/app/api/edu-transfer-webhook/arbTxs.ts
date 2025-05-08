import { eduTokenAddressOnArb } from "../lib/constants";
import { and, eq } from "drizzle-orm";
import { isAddressEqual } from "viem";
import externalContracts from "~~/contracts/externalContracts";
import { db } from "~~/drizzle/db";
import { Origin, TxStatus, txsOnArb } from "~~/drizzle/schema";

const {
  ERC20Outbox: { address: outbox },
  ERC20Inbox: { address: inbox },
} = externalContracts["42161"];

type Match = { originHash: string; arbHash: string[] | null };

// 1) Helper: find the matching row by origin/to/value
async function findArbRow(origin: Origin, to: string, value: string): Promise<Match> {
  const row = await db
    .select({ originHash: txsOnArb.originHash, arbHash: txsOnArb.arbHash })
    .from(txsOnArb)
    .where(and(eq(txsOnArb.origin, origin), eq(txsOnArb.to, to), eq(txsOnArb.value, value)))
    .limit(1)
    .then(r => r[0]);

  if (!row) {
    throw new Error(`Arb tx not found for { to=${to}, value=${value}, origin=${origin} }`);
  }
  return row;
}

// 2) Helper: update the row’s arbHash & status
async function markHandled(originHash: string, newHashes: string[]) {
  await db
    .update(txsOnArb)
    .set({
      arbHash: newHashes,
      status: TxStatus.Handled,
      updatedAt: new Date(),
    })
    .where(eq(txsOnArb.originHash, originHash));
}

// 3) Configuration for each “ca” check
const handlers = [
  {
    // EDUChain → BSC claim arrives on the Outbox
    matchCa: (ca: string) => isAddressEqual(ca, outbox),
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
export default async function handleArbTxs(ca: string, txHash: string, to: string, value: string) {
  for (const h of handlers) {
    if (!h.matchCa(ca)) continue;

    const row = await findArbRow(h.origin, to, value);
    const newHashes = h.computeNewHashes(row, txHash);

    // only write if hashes changed
    if (newHashes.length !== (row.arbHash?.length || 0) || newHashes.some((h, i) => row.arbHash?.[i] !== h)) {
      await markHandled(row.originHash, newHashes);
    }

    // once handled, stop checking other handlers
    break;
  }
}
