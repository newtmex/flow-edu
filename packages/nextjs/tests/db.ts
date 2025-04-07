import { db } from "~~/drizzle/db";
import { walletBindings } from "~~/drizzle/schema";

export async function resetDB() {
  await db.delete(walletBindings);
}
