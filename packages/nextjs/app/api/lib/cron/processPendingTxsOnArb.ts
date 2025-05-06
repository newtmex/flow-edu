// lib/cron/processPendingTxs.ts
import { bridgeArbitrumToBsc, claimEDUOnArbitrum } from "../bridge";
import { normalizeAddresses } from "../drizzleUtils";
import { acquireLock, releaseLock } from "./lock";
import { eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { ArbTxStatus, txsOnArb, walletBindings } from "~~/drizzle/schema";

export async function processPendingTxs() {
  const lockAcquired = await acquireLock();
  if (!lockAcquired) {
    return;
  }

  try {
    const pendingTxs = await db
      .select()
      .from(txsOnArb)
      .where(eq(txsOnArb.status, ArbTxStatus.Pending))
      .limit(10)
      .then(r => normalizeAddresses(r));

    for (const tx of pendingTxs) {
      try {
        const boundWallet = await db.query.walletBindings.findFirst({
          where: eq(walletBindings.userAddress, tx.to),
        });

        if (!boundWallet?.signature) {
          await db
            .update(txsOnArb)
            .set({
              status: ArbTxStatus.Ignored,
              updatedAt: new Date(),
            })
            .where(eq(txsOnArb.originHash, tx.originHash));
          continue;
        }

        if (tx.origin === "BSC") {
          // Currently no handling logic for BSC
        } else if (tx.origin === "EDUChain") {
          if (!tx.arbHash?.length) {
            const claimHash = await claimEDUOnArbitrum(tx.originHash);
            if (!claimHash) {
              continue;
            }

            tx.arbHash = [claimHash];
          }

          await db
            .update(txsOnArb)
            .set({
              ...tx,
              updatedAt: new Date(),
            })
            .where(eq(txsOnArb.originHash, tx.originHash));

          const eduTokenAddress = "0xf8173a39c56a554837C4C7f104153A005D284D11";
          const toBscHash = await bridgeArbitrumToBsc(tx.to, BigInt(tx.value), eduTokenAddress);

          if (toBscHash) {
            tx.arbHash.push(toBscHash);
            await db
              .update(txsOnArb)
              .set({
                ...tx,
                status: ArbTxStatus.Handled,
                updatedAt: new Date(),
              })
              .where(eq(txsOnArb.originHash, tx.originHash));
            console.log(`✅ Tx ${tx.originHash} handled with hash ${toBscHash}`);
          }
        }
      } catch (err) {
        console.error(`❌ Error on tx ${tx.originHash}:`, err);
      }
    }
  } finally {
    await releaseLock();
  }
}
