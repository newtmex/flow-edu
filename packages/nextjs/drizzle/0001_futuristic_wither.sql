CREATE TYPE "public"."origin" AS ENUM('BSC', 'EDUChain');--> statement-breakpoint
CREATE TYPE "public"."status" AS ENUM('pending', 'handled', 'ignored', 'failed');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "job_locks" (
	"job" text PRIMARY KEY NOT NULL,
	"locked_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "txs_on_arb" (
	"originHash" varchar(66) PRIMARY KEY NOT NULL,
	"arbHash" json DEFAULT '[]'::json,
	"to" varchar(42) NOT NULL,
	"value" numeric(78, 0) NOT NULL,
	"origin" "origin" NOT NULL,
	"status" "status" DEFAULT 'pending',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "txs_on_bsc" (
	"txHash" varchar(66) PRIMARY KEY NOT NULL,
	"from" varchar(42) NOT NULL,
	"to" varchar(42) NOT NULL,
	"ca" varchar(42),
	"value" numeric(78, 0) NOT NULL,
	"status" "status" DEFAULT 'pending',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "txs_on_edu_chain" (
	"txHash" varchar(66) PRIMARY KEY NOT NULL,
	"from" varchar(42) NOT NULL,
	"to" varchar(42) NOT NULL,
	"ca" varchar(42),
	"value" numeric(78, 0) NOT NULL,
	"status" "status" DEFAULT 'pending',
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "wallet_bindings" ALTER COLUMN "message" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "wallet_bindings" ALTER COLUMN "timestamp" SET NOT NULL;