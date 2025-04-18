CREATE TABLE IF NOT EXISTS "wallet_bindings" (
	"userAddress" text PRIMARY KEY NOT NULL,
	"flowEDUAddress" text NOT NULL,
	"privateKey" text NOT NULL,
	"signature" text,
	"message" text,
	"timestamp" bigint,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "wallet_bindings_flowEDUAddress_unique" UNIQUE("flowEDUAddress"),
	CONSTRAINT "wallet_bindings_privateKey_unique" UNIQUE("privateKey"),
	CONSTRAINT "wallet_bindings_signature_unique" UNIQUE("signature"),
	CONSTRAINT "wallet_bindings_message_unique" UNIQUE("message")
);
