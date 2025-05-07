import { bridgeArbitrumToBsc, bridgeEDUOnArbToEduChain, claimEDUOnArbitrum } from "../../bridge";
import { eduTokenAddressOnArb } from "../../constants";
import { normalizeAddresses } from "../../drizzleUtils";
import { eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { TxStatus, txsOnArb, walletBindings } from "~~/drizzle/schema";

export default async function () {
  const pendingTxs = await db
    .select()
    .from(txsOnArb)
    .where(eq(txsOnArb.status, TxStatus.Pending))
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
            status: TxStatus.Ignored,
            updatedAt: new Date(),
          })
          .where(eq(txsOnArb.originHash, tx.originHash));
        continue;
      }

      const completeBridging = async () => {
        if (!tx.arbHash?.length) {
          console.error(`❌ No arbHash for tx ${tx.originHash}`);
          return;
        }

        db.update(txsOnArb)
          .set({
            ...tx,
            status: TxStatus.Handled,
            updatedAt: new Date(),
          })
          .where(eq(txsOnArb.originHash, tx.originHash));

        console.log(`✅ Completed tx ${tx.originHash}`, tx.arbHash);
      };

      if (tx.origin === "BSC") {
        if (tx.arbHash?.length) {
          continue;
        }

        const toEduHash = await bridgeEDUOnArbToEduChain(tx.to, BigInt(tx.value));
        if (toEduHash) {
          tx.arbHash = [toEduHash];
          await completeBridging();
        }
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

        const toBscHash = await bridgeArbitrumToBsc(tx.to, BigInt(tx.value), eduTokenAddressOnArb);

        if (toBscHash) {
          tx.arbHash.push(toBscHash);
          await completeBridging();
        }
      }
    } catch (err) {
      console.error(`❌ Error on tx ${tx.originHash}:`, err);
    }
  }
}
