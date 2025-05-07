import { bigint, json, numeric, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const walletBindings = pgTable("wallet_bindings", {
  userAddress: text().primaryKey(),
  flowEDUAddress: text().notNull().unique(),
  privateKey: text().notNull().unique(),
  signature: text().unique(),
  message: text().unique().notNull(),
  timestamp: bigint({ mode: "number" }).notNull(),
  createdAt: timestamp().defaultNow(),
});

export enum Origin {
  BSC = "BSC",
  EDUChain = "EDUChain",
}

export enum ArbTxStatus {
  Pending = "pending",
  Handled = "handled",
  Ignored = "ignored",
}

export function enumToPgEnum<T extends Record<string, any>>(myEnum: T): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any;
}

export const originEnum = pgEnum("origin", enumToPgEnum(Origin));
export const arbTxStatusEnum = pgEnum("status", enumToPgEnum(ArbTxStatus));

export const txsOnArb = pgTable("txs_on_arb", {
  originHash: varchar({ length: 66 }).primaryKey(),
  arbHash: json().$type<string[]>().default([]),
  to: varchar({ length: 42 }).notNull(),
  value: numeric({ precision: 78, scale: 0 }).notNull(),
  origin: originEnum().notNull(), // "BSC" | "EDUChain"
  status: arbTxStatusEnum().default(ArbTxStatus.Pending), // pending | handled | ignored | failed
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const jobLocks = pgTable("job_locks", {
  job: text("job").primaryKey(), // e.g., "processPendingTxs"
  lockedAt: timestamp("locked_at").notNull(),
});
