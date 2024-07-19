import { loadEnvConfig } from "@next/env";
import { cwd } from "node:process";
import { defineConfig } from "drizzle-kit";

/**
 * with NextJS you need to specify the path to the database url for drizzle to detect it
 * https://github.com/drizzle-team/drizzle-orm/issues/654#issuecomment-1681676563
 *
 */
loadEnvConfig(cwd());

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
