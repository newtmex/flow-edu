import { ponder } from "ponder:registry";

ponder.on("EDUCoin:Transfer", async ({ event }) => {
    const { from, to, value } = event.args;

    try {
        await fetch(`${process.env.NEXT_API_URL}/api/edu-transfer-webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from,
                to,
                value: value.toString(),
                txHash: event.transaction.hash,
                ca: event.transaction.to,
            }),
        });
    } catch (err) {
        console.error(`Failed to notify Next.js: ${err}`);
    }
});
