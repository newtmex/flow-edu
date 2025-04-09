import { NextRequest, NextResponse } from "next/server";
import { bridgeBscToArbitrum } from "../lib/bridge";
import { eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { walletBindings } from "~~/drizzle/schema";

export const POST = async (req: NextRequest) => {
  const { from, to, value, txHash, ca } = await req.json();

  const boundWallet = await db.query.walletBindings.findFirst({
    where: eq(walletBindings.flowEDUAddress, to),
  });

  if (!boundWallet) return NextResponse.json({ status: "ignored" });

  const hash = await bridgeBscToArbitrum(boundWallet.privateKey, ca);
  if (!hash) return NextResponse.json({ status: "ignored" });

  console.log({ hash, from, value, txHash });

  return NextResponse.json({ status: "handled" });
};
