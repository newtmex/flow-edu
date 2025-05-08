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
  Arbitrum = "Arbitrum",
}

export enum TxStatus {
  Pending = "pending",
  Handled = "handled",
  Ignored = "ignored",
  Failed = "failed",
}

export function enumToPgEnum<T extends Record<string, any>>(myEnum: T): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: any) => `${value}`) as any;
}

export const originEnum = pgEnum("origin", enumToPgEnum(Origin));
export const txStatusEnum = pgEnum("status", enumToPgEnum(TxStatus));
const addressColumn = () => varchar({ length: 42 });
const ethBalanceColumn = () => numeric({ precision: 78, scale: 0 });

export const txsOnArb = pgTable("txs_on_arb", {
  originHash: varchar({ length: 66 }).primaryKey(),
  arbHash: json().$type<string[]>().default([]),
  to: addressColumn().notNull(),
  value: ethBalanceColumn().notNull(),
  origin: originEnum().notNull(), // "BSC" | "EDUChain"
  status: txStatusEnum().default(TxStatus.Pending), // pending | handled | ignored | failed
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const jobLocks = pgTable("job_locks", {
  job: text("job").primaryKey(), // e.g., "processPendingTxs"
  lockedAt: timestamp("locked_at").notNull(),
});

const originColumns = {
  txHash: varchar({ length: 66 }).primaryKey(),
  from: addressColumn().notNull(),
  to: addressColumn().notNull(),
  ca: addressColumn(),
  value: ethBalanceColumn().notNull(),
  status: txStatusEnum().default(TxStatus.Pending),
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp().defaultNow().notNull(),
};

export const txsOnBsc = pgTable("txs_on_bsc", {
  ...originColumns,
});

export const txsOnEduChain = pgTable("txs_on_edu_chain", {
  ...originColumns,
});
