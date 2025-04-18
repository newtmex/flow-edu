// app/api/generate-keypair/[address]/route.ts
import { NextRequest } from "next/server";
import Encryption from "../../lib/Encryption";
import { eduClient } from "../../lib/clients";
import { deriveHDWalletFromAddress } from "../../lib/deriveHDWallet";
import { normalizeAddresses } from "../../lib/drizzleUtils";
import { DateTime } from "luxon";
// Encryption util for privKey
import { isAddress } from "viem";
// Address validation util
import { db } from "~~/drizzle/db";
// DB client from Drizzle
import { walletBindings } from "~~/drizzle/schema";
import { GenerateKeypairResponse } from "~~/types/wallet";

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
    const wallet = deriveHDWalletFromAddress(address); // Deterministic wallet generation
    const timestamp = await eduClient.getBlock().then(block => Number(block.timestamp));

    binding = await db
      .insert(walletBindings)
      .values(
        normalizeAddresses({
          userAddress: address,
          flowEDUAddress: wallet.address,
          privateKey: Encryption.new().encryptPlainText(wallet.privateKey), // Always store encrypted privKey
          message: `
FlowEDU Wallet Binding Request


This message is being signed to bind a public key to your wallet address.


Wallet Address: ${address}

Public Key to Bind: ${wallet.publicKey}

Timestamp (ISO 8601): ${DateTime.fromSeconds(timestamp).toISO()}


By signing this message, you confirm that you are the owner of the wallet address above and authorize FlowEDU to associate the supplied public key with your account.

Do not share this signature.

All funds sent to the bound Public Key in this message will be permanently lost if this binding request was not successful.
`,
          timestamp,
        }),
      )
      .returning()
      .then(data => data[0]);
  }

  if (!binding) {
    return Response.json({ message: "Failed to create wallet binding" }, { status: 500 });
  }

  const isBound = Boolean(binding.signature); // Has user signed message yet?
  return Response.json({
    address: binding.userAddress,
    flowEDUAddress: binding.flowEDUAddress,
    isBound,
    message: isBound ? null : binding.message,
  } as GenerateKeypairResponse);
}
