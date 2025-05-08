import { ponder } from "ponder:registry";
import { notifyNextApi } from "./helpers";
import { decodeFunctionData } from "viem";

// ## ARB

// Send EDU to EDUChain txs
ponder.on(
    "ERC20Inbox:InboxMessageDelivered",
    async ({
        event,
        context: {
            contracts: { ERC20Inbox },
        },
    }) => {
        const {
            args: [to, value],
        } = decodeFunctionData({
            abi: ERC20Inbox.abi,
            data: event.transaction.input,
        });
        if (!to || !value) return;

        await notifyNextApi({
            from: event.transaction.from,
            to: to.toString(),
            value: value.toString(),
            txHash: event.transaction.hash,
            ca: event.transaction.to,
            origin: "Arbitrum",
        });
    }
);

// EDU Claim txs
ponder.on(
    "ERC20Outbox:OutBoxTransactionExecuted",
    async ({
        event,
        context: {
            contracts: { ERC20Outbox },
        },
    }) => {
        const {
            args: [, , , to, , , , value],
        } = decodeFunctionData({
            abi: ERC20Outbox.abi,
            data: event.transaction.input,
        });
        if (!to || !value) return;

        await notifyNextApi({
            from: event.transaction.from,
            to: to.toString(),
            value: value.toString(),
            txHash: event.transaction.hash,
            ca: event.transaction.to,
            origin: "Arbitrum",
        });
    }
);

// Send EDU to BSC
ponder.on("EDUOFTV2:SendToChain", async ({ event }) => {
    const { _amount, _from, _toAddress } = event.args;

    await notifyNextApi({
        from: event.transaction.from,
        to: _toAddress,
        value: _amount.toString(),
        txHash: event.transaction.hash,
        ca: event.transaction.to,
        origin: "Arbitrum",
    });
});

// ## BSC

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

ponder.on("ProxyOFTV2:SendToChain", async ({ event }) => {
    const { _amount, _from, _toAddress } = event.args;

    await notifyNextApi({
        from: event.transaction.from,
        to: _toAddress,
        value: _amount.toString(),
        txHash: event.transaction.hash,
        ca: null,
        origin: "BSC",
    });
});

// ## EDU

ponder.on("ArbSys:L2ToL1Tx", async ({ event }) => {
    const { transaction, args } = event;

    await notifyNextApi({
        from: transaction.from,
        to: args.destination,
        value: args.callvalue.toString(),
        txHash: transaction.hash,
        ca: null,
        origin: "EDUChain",
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

        // Execute process arb txs cron
        try {
            fetch(`${process.env.NEXT_API_URL}/api/cron/process-txs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        } catch (err) {
            console.error(`Failed to notify Next.js: ${err}`);
        }
    }
);
