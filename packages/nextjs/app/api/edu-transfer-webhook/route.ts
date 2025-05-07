import { NextRequest, NextResponse } from "next/server";
import { bridgeBscToArbitrum, bridgeEDUChainToArbitrum } from "../lib/bridge";
import { normalizeAddresses } from "../lib/drizzleUtils";
import { eq } from "drizzle-orm";
import { db } from "~~/drizzle/db";
import { txsOnArb, walletBindings } from "~~/drizzle/schema";

export const POST = async (req: NextRequest) => {
  const { from, to, value, txHash, ca, origin } = normalizeAddresses(await req.json());

  const boundWallet = await db.query.walletBindings.findFirst({
    where: eq(walletBindings.flowEDUAddress, to),
  });

  if (!boundWallet?.signature) return NextResponse.json({ status: "ignored" });

  let bridgedInfo: { hash: string; value: bigint } | null = null;

  switch (origin) {
    case "BSC":
      bridgedInfo = await bridgeBscToArbitrum(boundWallet.privateKey, ca);
      break;
    case "EDUChain":
      bridgedInfo = await bridgeEDUChainToArbitrum(boundWallet.privateKey, ca);
      break;
  }

  if (!bridgedInfo) return NextResponse.json({ status: "ignored" });

  await db.insert(txsOnArb).values({
    originHash: bridgedInfo.hash,
    to: boundWallet.userAddress,
    origin,
    value: bridgedInfo.value.toString(),
  });

  return NextResponse.json({ status: "handled" });
};
