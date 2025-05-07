import { eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { Origin, TxStatus, txsOnArb, walletBindings } from "~~/drizzle/schema";

// Types
type PendingTx = {
  txHash: string;
  to: string;
  ca: string | null;
};

type BridgeFn = (privateKey: string, ca: string | null) => Promise<null | { hash: string; value: bigint }>;

export async function handleBridgingFromChain({
  getPendingTxs,
  updateTxStatus,
  bridgeFn,
  origin,
}: {
  getPendingTxs: () => Promise<PendingTx[]>;
  updateTxStatus: (txHash: string, status: TxStatus) => Promise<void>;
  bridgeFn: BridgeFn;
  origin: Origin;
}) {
  let pending = await getPendingTxs();

  while (pending.length > 0) {
    await Promise.all(
      pending.map(async tx => {
        const boundWallet = await db.query.walletBindings.findFirst({
          where: eq(walletBindings.flowEDUAddress, tx.to),
        });

        let newStatus = TxStatus.Pending;

        if (!boundWallet?.signature) {
          newStatus = TxStatus.Ignored;
        } else {
          const bridgedInfo = await bridgeFn(boundWallet.privateKey, tx.ca);

          if (bridgedInfo) {
            await db.insert(txsOnArb).values({
              originHash: bridgedInfo.hash,
              to: boundWallet.userAddress,
              origin,
              value: String(bridgedInfo.value),
            });
            newStatus = TxStatus.Handled;
          } else {
            newStatus = TxStatus.Failed;
          }
        }

        await updateTxStatus(tx.txHash, newStatus);
      }),
    );

    pending = await getPendingTxs();
  }
}
