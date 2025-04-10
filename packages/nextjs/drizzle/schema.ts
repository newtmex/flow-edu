import { bigint, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const walletBindings = pgTable("wallet_bindings", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  userAddress: text("user_address").notNull().unique(),
  flowEDUAddress: text().notNull().unique(),
  privateKey: text("private_key").notNull().unique(),
  signature: text("signature").unique(),
  message: text("message").unique(),
  timestamp: bigint("timestamp", { mode: "number" }),
  createdAt: timestamp("created_at").defaultNow(),
});
