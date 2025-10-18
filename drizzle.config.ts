import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  dbCredentials: {
    // url: "postgresql://user:password@host:port/dbname",
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true
});