import { defineConfig } from "drizzle-kit";
import "~~/drizzle/envConfig";

export const dbConfig = {
  password: process.env.DATABASE_PASSWORD || undefined,
  database: process.env.DATABASE_NAME!,
  host: process.env.DATABASE_HOST!,
  port: Number(process.env.DATABASE_PORT),
  user: process.env.DATABASE_USER,
  ssl: false,
};

const ca = process.env.DATABASE_CA_CERT;
if (ca) {
  Object.assign(dbConfig, {
    ...dbConfig,
    ssl: {
      rejectUnauthorized: false,
      ca,
    },
  });
}

export default defineConfig({
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  out: "./drizzle",
  dbCredentials: dbConfig,
});
