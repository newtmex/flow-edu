import { NextRequest, NextResponse } from "next/server";
import { normalizeAddresses } from "../lib/drizzleUtils";
import handleArbTxs from "./arbTxs";
import { eq, or } from "drizzle-orm";
import { Hex, bytesToHex, getAddress, hexToBytes } from "viem";
import { db } from "~~/drizzle/db";
import { Origin, txsOnBsc, txsOnEduChain, walletBindings } from "~~/drizzle/schema";

const removeAddressZeroPadding = (address: Hex) => {
  const bytes = hexToBytes(address);
  if (bytes.length < 32) throw new Error("Invalid padded address length");

  const sliced = bytes.slice(0, 20); // Take first 20 bytes
  return getAddress(bytesToHex(sliced)); // Returns checksummed address
};

export const POST = async (req: NextRequest) => {
  let body: any;
  try {
    body = await req.json();
    body = normalizeAddresses(body);
    body.valueSender = removeAddressZeroPadding(body.valueSender); // Normalise valueSender bytes32
    body.valueRecipient = removeAddressZeroPadding(body.valueRecipient); // Normalise from bytes32
  } catch (e) {
    console.error(e);
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const { valueSender, valueRecipient, value, txHash, ca, origin } = body;

  if (origin !== Origin.Arbitrum) {
    const boundWallet = await db.query.walletBindings.findFirst({
      where: or(eq(walletBindings.flowEDUAddress, valueRecipient), eq(walletBindings.flowEDUAddress, valueSender)),
    });

    if (!boundWallet) return NextResponse.json({ status: "ignored" });

    await (
      origin == Origin.BSC
        ? db.insert(txsOnBsc).values({
            txHash,
            ca,
            valueSender,
            valueRecipient,
            value,
          })
        : origin == Origin.EDUChain
          ? db.insert(txsOnEduChain).values({
              txHash,
              ca,
              valueSender,
              valueRecipient,
              value,
            })
          : (() => {
              throw new Error(`Unknown origin`);
            })()
    ).onConflictDoNothing();
  } else {
    await handleArbTxs({ ca, txHash, valueRecipient, value, valueSender });
  }

  return NextResponse.json({ status: "handled" });
};
