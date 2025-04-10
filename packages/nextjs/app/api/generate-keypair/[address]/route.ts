// app/api/generate-keypair/[address]/route.ts
import { NextRequest } from "next/server";
import Encryption from "../../lib/Encryption";
import { deriveHDWallet } from "../../lib/deriveHDWallet";
import { normalizeAddresses } from "../../lib/drizzleUtils";
// Encryption util for privKey
import { isAddress } from "viem";
// Address validation util
import { db } from "~~/drizzle/db";
// DB client from Drizzle
import { walletBindings } from "~~/drizzle/schema";

// Wallet bindings table/schema

// NextJS 15 convention — route params come as a promise
export async function GET(req: NextRequest, props: { params: Promise<{ address: string }> }) {
  const { address } = normalizeAddresses(await props.params);

  if (!isAddress(address)) {
    return Response.json({ message: "Invalid Address" }, { status: 400 });
  }

  // Check if wallet already exists for this user
  let binding = await db.query.walletBindings.findFirst({
    where: (walletBindings, { eq }) => eq(walletBindings.userAddress, address),
  });

  // If not found — generate a new HD wallet
  if (!binding) {
    const nextIndex = (await db.$count(walletBindings)) + 1; // Incremental index
    const wallet = deriveHDWallet(nextIndex); // Deterministic wallet generation

    binding = await db
      .insert(walletBindings)
      .values(
        normalizeAddresses({
          userAddress: address,
          flowEDUAddress: wallet.address,
          privateKey: Encryption.new().encryptPlainText(wallet.privateKey), // Always store encrypted privKey
        }),
      )
      .returning()
      .then(data => data[0]);
  }

  if (!binding) {
    return Response.json({ message: "Failed to create wallet binding" }, { status: 500 });
  }

  return Response.json({
    address: binding.userAddress,
    flowEDUAddress: binding.flowEDUAddress,
    isBound: Boolean(binding.signature), // Has user signed message yet?
  });
}
