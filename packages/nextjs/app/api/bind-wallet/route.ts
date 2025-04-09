import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { isAddress, verifyMessage } from "viem";
import { db } from "~~/drizzle/db";
import { walletBindings } from "~~/drizzle/schema";

/**
 * POST /api/bind-wallet
 *
 * Binds a FlowEDU HD Wallet to a user wallet address by verifying
 * the signed message and updating the binding record in the database.
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userAddress: address, signature, message } = body;

  if (!signature || !message) {
    return Response.json({ message: "Invalid Request" }, { status: 400 });
  }

  // Validate userAddress
  if (!isAddress(address)) {
    return Response.json({ message: "Invalid Address" }, { status: 400 });
  }

  // Verify that signature matches the address for the given message
  const isValid = await verifyMessage({
    address,
    message,
    signature,
  });

  if (!isValid) {
    return Response.json({ message: "Invalid Signature" }, { status: 400 });
  }

  // Update the wallet binding in the database with the provided signature
  const binding = await db
    .update(walletBindings)
    .set({ signature })
    .where(eq(walletBindings.userAddress, address))
    .returning()
    .then(data => data[0]);

  if (!binding) {
    return Response.json({ message: "Wallet not found" }, { status: 404 });
  }

  return Response.json({ success: true });
}
