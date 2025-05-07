import { NextRequest, NextResponse } from "next/server";
import { normalizeAddresses } from "../lib/drizzleUtils";
import { eq, or } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { Origin, txsOnBsc, txsOnEduChain, walletBindings } from "~~/drizzle/schema";

export const POST = async (req: NextRequest) => {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { from, to, value, txHash, ca, origin } = normalizeAddresses(body);

  const boundWallet = await db.query.walletBindings.findFirst({
    where: or(eq(walletBindings.flowEDUAddress, to), eq(walletBindings.flowEDUAddress, from)),
  });

  if (!boundWallet) return NextResponse.json({ status: "ignored" });

  await (
    origin == Origin.BSC
      ? db.insert(txsOnBsc).values({
          txHash,
          ca,
          from,
          to,
          value,
        })
      : origin == Origin.EDUChain
        ? db.insert(txsOnEduChain).values({
            txHash,
            ca,
            from,
            to,
            value,
          })
        : (() => {
            throw new Error(`Unknown origin`);
          })()
  ).onConflictDoNothing();

  return NextResponse.json({ status: "handled" });
};
