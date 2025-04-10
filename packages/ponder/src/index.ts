import { ponder } from "ponder:registry";
import { notifyNextApi } from "./helpers";

ponder.on("EDUCoinBSC:Transfer", async ({ event }) => {
    const { from, to, value } = event.args;

    await notifyNextApi({
        from,
        to,
        value: value.toString(),
        txHash: event.transaction.hash,
        ca: event.transaction.to,
        origin: "BSC",
    });
});

ponder.on(
    "MonitorNativeEDUTransfers:block",
    async ({ event, context: { client } }) => {
        const blockTxs = await client
            .getBlock({
                includeTransactions: true,
                blockNumber: event.block.number,
            })
            .then((block) => block.transactions);

        const txsWithValue = blockTxs.filter(
            (tx) => tx.value > 0n && tx.to !== null
        );

        for (const tx of txsWithValue) {
            const { from, to, value, hash: txHash } = tx;
            if (!from || !to) {
                continue;
            }

            await notifyNextApi({
                from,
                to,
                value: value.toString(),
                txHash,
                ca: null,
                origin: "EDUChain",
            });
        }
    }
);
