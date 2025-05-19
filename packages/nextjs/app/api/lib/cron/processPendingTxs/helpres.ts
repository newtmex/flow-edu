import { centralAccount } from "../../config";
import { and, asc, eq, gte, or } from "drizzle-orm";
import { isAddressEqual, parseEther } from "viem";
import { db } from "~~/drizzle/db";
import { Origin, TxStatus, txsOnArb, txsOnBsc, txsOnEduChain, walletBindings } from "~~/drizzle/schema";

type BridgedInfo = null | { hash: string; value: bigint | string };
type BridgeFn = (privateKey: string, ca: string | null) => Promise<BridgedInfo>;

export async function handleBridgingFromOriginChain({ bridgeFn, origin }: { bridgeFn: BridgeFn; origin: Origin }) {
  const originTable = origin == Origin.BSC ? txsOnBsc : origin == Origin.EDUChain ? txsOnEduChain : undefined;
  if (!originTable) throw new Error(`Invalid origin ${origin}`);

  const getPendingTxs = () =>
    db
      .select({
        txHash: originTable.txHash,
        valueRecipient: originTable.valueRecipient,
        ca: originTable.ca,
        valueSender: originTable.valueSender,
        value: originTable.value,
      })
      .from(originTable)
      .where(and(eq(originTable.status, TxStatus.Pending), gte(originTable.value, parseEther("1").toString())))
      .limit(100)
      .orderBy(asc(originTable.createdAt));

  const updateTxStatus = (txHash: string, status: TxStatus) =>
    db.update(originTable).set({ status }).where(eq(originTable.txHash, txHash));

  let pending = await getPendingTxs();

  let lastPendingKey = "";
  while (pending.length > 0) {
    const currentPendingKey = pending
      .map(tx => tx.txHash)
      .sort()
      .join(",");
    if (currentPendingKey === lastPendingKey) {
      const [tx] = pending;
      console.warn("🔁 Origin Identical pending set detected. Exiting loop.", tx.txHash, origin);
      break;
    }

    lastPendingKey = currentPendingKey;

    await Promise.all(
      pending.map(async tx => {
        const boundWallet = await db.query.walletBindings.findFirst({
          where: or(
            eq(walletBindings.flowEDUAddress, tx.valueRecipient),
            eq(walletBindings.flowEDUAddress, tx.valueSender),
          ),
        });

        let newStatus = TxStatus.Pending;
        const txIsFeePayment = isAddressEqual(tx.valueRecipient, centralAccount.address);

        console.log("working on", tx.txHash, origin);

        if (txIsFeePayment || !boundWallet?.signature) {
          newStatus = TxStatus.Ignored;
        } else {
          const bridgedInfo = isAddressEqual(boundWallet.flowEDUAddress, tx.valueSender)
            ? {
                hash: tx.txHash,
                value: tx.value,
              }
            : await bridgeFn(boundWallet.privateKey, tx.ca);

          if (bridgedInfo) {
            await db
              .insert(txsOnArb)
              .values({
                originHash: bridgedInfo.hash,
                valueRecipient: boundWallet.userAddress,
                valueSender: boundWallet.flowEDUAddress,
                origin,
                value: String(bridgedInfo.value),
              })
              .onConflictDoNothing();
            newStatus = TxStatus.Handled;
          } else {
            // newStatus = TxStatus.Failed;
          }
        }

        await updateTxStatus(tx.txHash, newStatus);
      }),
    );

    pending = await getPendingTxs();
  }
}
