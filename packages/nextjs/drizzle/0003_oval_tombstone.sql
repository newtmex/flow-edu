ALTER TABLE "txs_on_arb" RENAME COLUMN "to" TO "valueRecipient";--> statement-breakpoint
ALTER TABLE "txs_on_bsc" RENAME COLUMN "from" TO "valueSender";--> statement-breakpoint
ALTER TABLE "txs_on_bsc" RENAME COLUMN "to" TO "valueRecipient";--> statement-breakpoint
ALTER TABLE "txs_on_edu_chain" RENAME COLUMN "from" TO "valueSender";--> statement-breakpoint
ALTER TABLE "txs_on_edu_chain" RENAME COLUMN "to" TO "valueRecipient";--> statement-breakpoint
ALTER TABLE "txs_on_arb" ADD COLUMN "valueSender" varchar(42) NOT NULL;