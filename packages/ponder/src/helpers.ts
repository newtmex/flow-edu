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
