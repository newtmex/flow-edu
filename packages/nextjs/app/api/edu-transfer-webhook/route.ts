import { NextRequest, NextResponse } from "next/server";
import { normalizeAddresses } from "../lib/drizzleUtils";
import { eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { txsOnBsc, txsOnEduChain, walletBindings } from "~~/drizzle/schema";

export const POST = async (req: NextRequest) => {
  const { from, to, value, txHash, ca, origin } = normalizeAddresses(await req.json());

  const boundWallet = await db.query.walletBindings.findFirst({
    where: eq(walletBindings.flowEDUAddress, to),
  });

  if (!boundWallet) return NextResponse.json({ status: "ignored" });

  switch (origin) {
    case "BSC":
      await db.insert(txsOnBsc).values({
        txHash,
        ca,
        from,
        to,
        value,
      });
      break;
    case "EDUChain":
      await db.insert(txsOnEduChain).values({
        txHash,
        ca,
        from,
        to,
        value,
      });
      break;
  }

  return NextResponse.json({ status: "handled" });
};
