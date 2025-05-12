// app/api/cron/process-txs/route.ts
import { NextResponse } from "next/server";
import { processPendingTxs } from "../../lib/cron/processPendingTxs";

export const GET = async () => {
  await processPendingTxs();
  return NextResponse.json({ status: "ok" });
};
