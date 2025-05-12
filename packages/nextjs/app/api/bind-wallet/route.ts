import { NextRequest } from "next/server";
import { normalizeAddresses } from "../lib/drizzleUtils";
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
});

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return Response.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parse = BindWalletSchema.safeParse(normalizeAddresses(body));

  if (!parse.success) {
    return Response.json({ message: parse.error.message, errors: parse.error.flatten().fieldErrors }, { status: 400 });
  }

  const { userAddress, signature } = parse.data;
  const binding = await db.query.walletBindings
    .findFirst({ where: eq(walletBindings.userAddress, userAddress) })
    .execute();

  if (!binding) {
    return Response.json({ message: "Wallet not found" }, { status: 404 });
  }

  // Signature verification
  const isValid = await verifyMessage({
    address: binding.userAddress,
    message: binding.message,
    signature,
  });

  if (!isValid) {
    return Response.json({ message: "Invalid Signature" }, { status: 400 });
  }

  // Complete binding
  await db.update(walletBindings).set({ signature }).where(eq(walletBindings.userAddress, binding.userAddress));

  return Response.json({ success: true });
}
