import { bigint, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const walletBindings = pgTable("wallet_bindings", {
  id: integer().primaryKey().generatedByDefaultAsIdentity(),
  userAddress: text("user_address").notNull(),
  flowEDUAddress: text().notNull(),
  privateKey: text("private_key").notNull(),
  signature: text("signature"),
  message: text("message"),
  timestamp: bigint("timestamp", { mode: "number" }),
  createdAt: timestamp("created_at").defaultNow(),
});
