import { NextRequest } from "next/server";
import { normalizeAddress } from "../lib/helpers";
import { eq } from "drizzle-orm";
import { isAddress, isHex, verifyMessage } from "viem";
import { z } from "zod";
import { db } from "~~/drizzle/db";
import { walletBindings } from "~~/drizzle/schema";

/**
 * POST /api/bind-wallet
 *
 * Binds a FlowEDU HD Wallet to a user wallet address
 * by verifying a signed message and updating the DB.
 */

// Define and enforce expected request shape
const BindWalletSchema = z.object({
  userAddress: z.string().refine((v): v is `0x${string}` => isAddress(v), {
    message: "Invalid address format",
  }),
  signature: z.string().refine((v): v is `0x${string}` => isHex(v), {
    message: "Invalid signature format",
  }),
  message: z.string().min(1, "Message required"),
});

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parse = BindWalletSchema.safeParse(body);

  if (!parse.success) {
    return Response.json({ message: parse.error.message, errors: parse.error.flatten().fieldErrors }, { status: 400 });
  }

  const { userAddress: address, signature, message } = parse.data;

  // Signature verification
  const isValid = await verifyMessage({
    address,
    message,
    signature,
  });

  if (!isValid) {
    return Response.json({ message: "Invalid Signature" }, { status: 400 });
  }

  // Optional: Enforce signing recent data only (prevents replay)
  // e.g. message must include "Bind Wallet at [timestamp]" and not be older than X mins.

  // Update record
  const binding = await db
    .update(walletBindings)
    .set({ signature, message })
    .where(eq(walletBindings.userAddress, normalizeAddress(address)))
    .returning()
    .then(rows => rows[0]);

  if (!binding) {
    return Response.json({ message: "Wallet not found" }, { status: 404 });
  }

  return Response.json({ success: true });
}
