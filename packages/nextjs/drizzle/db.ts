import * as schema from "./schema";
import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { dbConfig } from "~~/drizzle.config";

export const db = drizzle({
  connection: dbConfig,
  schema,
});
