import { centralAccount } from "../../config";
import { eq, or } from "drizzle-orm";
import { isAddressEqual } from "viem";
import { db } from "~~/drizzle/db";
import { Origin, TxStatus, txsOnArb, walletBindings } from "~~/drizzle/schema";

// Types
type PendingTx = {
  txHash: string;
  to: string;
  value: string | bigint;
  from: string;
  ca: string | null;
};

type BridgeFn = (privateKey: string, ca: string | null) => Promise<null | { hash: string; value: bigint | string }>;

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
          where: or(eq(walletBindings.flowEDUAddress, tx.to), eq(walletBindings.flowEDUAddress, tx.from)),
        });

        let newStatus = TxStatus.Pending;

        if (!boundWallet?.signature) {
          newStatus = TxStatus.Ignored;
        } else {
          const bridgedInfo: Awaited<ReturnType<BridgeFn>> = isAddressEqual(boundWallet.flowEDUAddress, tx.from)
            ? (() => {
                if (isAddressEqual(tx.to, centralAccount.address)) return null;

                return {
                  hash: tx.txHash,
                  value: tx.value,
                };
              })()
            : await bridgeFn(boundWallet.privateKey, tx.ca);

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
