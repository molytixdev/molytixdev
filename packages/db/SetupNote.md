# Steps to Setup the Project

## Table of Contents

- [Prerequisites](#prerequisites)
- [Step 1: Initial Configuration](#step-1-initial-configuration)
- [Step 2: Running Commands](#step-2-running-commands)
- [Step 3: Integration](#step-3-integration)
- [Additional Notes](#additional-notes)

---

## Prerequisites

- [ ] Set up package (add package.json)  
- [ ] Install base dependencies

```bash
pnpm add -F @workspace/db drizzle-orm @neondatabase/serverless dotenv
pnpm add -D -F @workspace/db drizzle-kit tsx
```

---

## Step 1: Initial Configuration

### Objective:

To initialize and configure the `@workspace/db` package with TypeScript, Node.js, and Drizzle ORM for Neon serverless, including migration and seeding setup.

### Instructions:

1. **Configure environment variables**
   Create a `.env` or `.env.local` file in your `db` package or workspace root containing at least:

   ```
   DATABASE_URL=your_neon_database_url_here
   DB_MIGRATING=true       # Set only when running migrations
   DB_SEEDING=true         # Set only when running seeds
   ```

2. **Set up Drizzle config**
   Ensure `drizzle.config.ts` is present at the root of the `db` package with content similar to:

   ```ts
   import "dotenv/config";
   import { defineConfig } from "drizzle-kit";

   export default defineConfig({
     schema: "./src/schema/index.ts",
     out: "./src/migrations",
     dialect: "postgresql",
     dbCredentials: {
       url: process.env.DATABASE_URL!,
     },
   });
   ```

3. **Create the schema**
   Define your database schema in the `src/schema/` folder. For example, `user.ts` defines user tables and `index.ts` exports all schemas.

4. **Create Drizzle client and exports**
   In `src/index.ts`, instantiate the Drizzle client using `@neondatabase/serverless` and export it along with your schema for consumption by your API or other packages.

5. **Migration setup**

   * Migration SQL files are stored under `src/migrations/`.
   * Use `src/migrate.ts` to run migrations programmatically or via CLI scripts.
   * Guard migrations with environment variable `DB_MIGRATING=true` to avoid accidental runs.

6. **Seeding setup**

   * Seed data is stored under `src/seeds/data/`.
   * Seed logic is implemented in `src/seeds/`.
   * Use `src/seed.ts` to run seeding, guarded by `DB_SEEDING=true`.

7. **TypeScript configuration**
   `tsconfig.json` and `tsconfig.lint.json` are configured to support your project’s build and linting processes.

---

## Step 2: Running Commands

### Generating migrations:

```bash
pnpm --filter @workspace/db run generate
```

### Applying migrations:

```bash
DB_MIGRATING=true pnpm --filter @workspace/db run migrate
```

### Seeding the database:

```bash
DB_SEEDING=true pnpm --filter @workspace/db run seed
```

---

## Step 3: Integration

* Import the exported `db` and schema objects from `@workspace/db` in your API or other apps to query the database using Drizzle ORM.
* Use tRPC or your preferred API layer to expose database operations.

---

## Additional Notes

* Always commit migration SQL files under `src/migrations/` to version control; they serve as your schema’s source of truth.
* Use `.env` files scoped per package or per app to avoid leaking secrets across boundaries.
* Keep the `DB_MIGRATING` and `DB_SEEDING` environment variables **off** by default to prevent accidental data modifications.
* For local development, use `tsx` to run your TypeScript migration and seed scripts without compiling.

---

This setup ensures a clean separation of your database layer in a monorepo context, optimized for Neon serverless with Drizzle ORM.

```

You can copy this directly into your `SetupNote.md` file. Let me know if you want me to help with adding example scripts or anything else!
```
