import { NextRequest, NextResponse } from "next/server";
import { bridgeBscToArbitrum, bridgeEDUChainToArbitrum } from "../lib/bridge";
import { eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { walletBindings } from "~~/drizzle/schema";

export const POST = async (req: NextRequest) => {
  const { from, to, value, txHash, ca, origin } = await req.json();

  const boundWallet = await db.query.walletBindings.findFirst({
    where: eq(walletBindings.flowEDUAddress, to),
  });

  if (!boundWallet) return NextResponse.json({ status: "ignored" });

  let hash: `0x${string}` | null = null;

  switch (origin) {
    case "BSC":
      hash = await bridgeBscToArbitrum(boundWallet.privateKey, ca);
      break;
    case "EDUChain":
      hash = await bridgeEDUChainToArbitrum(boundWallet.privateKey, ca);
      break;
  }

  console.log({ hash, from, value, txHash, origin });

  if (!hash) return NextResponse.json({ status: "ignored" });

  return NextResponse.json({ status: "handled" });
};
