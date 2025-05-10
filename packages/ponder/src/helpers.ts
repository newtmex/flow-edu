import { networks } from "../ponder.config";

export const notifyNextApi = async (data: {
    valueSender: string;
    valueRecipient: string;
    value: string;
    txHash: string;
    ca: string | null;
    origin: keyof typeof networks;
}) => {
    const url = `${process.env.NEXT_API_URL}/api/edu-transfer-webhook`;
    try {
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    } catch (err) {
        console.error(`${url} Failed to notify Next.js: ${err}`);
    }
};

export const processTxsCron = async () => {
    const url = `${process.env.NEXT_API_URL}/api/cron/process-txs`;
    try {
        await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (err) {
        console.error(`${url} Failed to notify Next.js: ${err}`);
    }
};
