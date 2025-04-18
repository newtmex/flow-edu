import { bigint, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const walletBindings = pgTable("wallet_bindings", {
  userAddress: text().primaryKey(),
  flowEDUAddress: text().notNull().unique(),
  privateKey: text().notNull().unique(),
  signature: text().unique(),
  message: text().unique().notNull(),
  timestamp: bigint({ mode: "number" }).notNull(),
  createdAt: timestamp().defaultNow(),
});
