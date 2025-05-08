import { networks } from "../ponder.config";

export const notifyNextApi = async (data: {
    from: string;
    to: string;
    value: string;
    txHash: string;
    ca: string | null;
    origin: keyof typeof networks;
}) => {
    try {
        fetch(`${process.env.NEXT_API_URL}/api/edu-transfer-webhook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.error(`Failed to notify Next.js: ${err}`);
    }
};

export const processTxsCron = async () => {
    // Execute process arb txs cron
    try {
        await fetch(`${process.env.NEXT_API_URL}/api/cron/process-txs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        console.error(`Failed to notify Next.js: ${err}`);
    }
};
