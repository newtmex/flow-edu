import { ponder } from "ponder:registry";
import { notifyNextApi, processTxsCron } from "./helpers";
import { decodeFunctionData, isAddressEqual } from "viem";
import { replaceBigInts } from "ponder";

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
        if (
            !event.transaction.to ||
            !isAddressEqual(event.transaction.to, ERC20Inbox.address)
        )
            return;

        const {
            args: [to, value],
        } = decodeFunctionData({
            abi: ERC20Inbox.abi,
            data: event.transaction.input,
        });
        if (!to || !value) return;

        await notifyNextApi({
            valueSender: event.transaction.from,
            valueRecipient: to.toString(),
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
        if (
            !event.transaction.to ||
            !isAddressEqual(event.transaction.to, ERC20Outbox.address)
        )
            return;

        const {
            args: [, , valueSender, valueRecipient, , , , value],
        } = decodeFunctionData({
            abi: ERC20Outbox.abi,
            data: event.transaction.input,
        });
        if (!valueRecipient || !value || !valueSender) return;

        await notifyNextApi(
            replaceBigInts(
                {
                    valueSender,
                    valueRecipient,
                    value,
                    txHash: event.transaction.hash,
                    ca: event.transaction.to,
                    origin: "Arbitrum",
                },
                String
            )
        );
    }
);

// Send EDU to BSC
ponder.on("EDUOFTV2:SendToChain", async ({ event }) => {
    const { _amount, _from, _toAddress } = event.args;

    await notifyNextApi({
        valueSender: _from,
        valueRecipient: _toAddress,
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
        valueSender: from,
        valueRecipient: to,
        value: value.toString(),
        txHash: event.transaction.hash,
        ca: event.transaction.to,
        origin: "BSC",
    });
});

ponder.on("ProxyOFTV2:SendToChain", async ({ event }) => {
    const { _amount, _from, _toAddress } = event.args;

    await notifyNextApi({
        valueSender: _from,
        valueRecipient: _toAddress,
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
        valueSender: args.caller,
        valueRecipient: args.destination,
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
                valueSender: from,
                valueRecipient: to,
                value: value.toString(),
                txHash,
                ca: null,
                origin: "EDUChain",
            });
        }

        processTxsCron();
    }
);
