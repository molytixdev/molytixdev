
# @workspace/db

Database package for the monorepo using Drizzle ORM with Neon serverless.

---

## Overview

- Type-safe schema definitions  
- SQL migrations and seeding scripts  
- Drizzle client configured for Neon serverless  
- Shared DB layer for API and backend apps

---

## Setup

### Install dependencies

```bash
pnpm i 
```

### Environment variables

Create `.env` with:

```env
DATABASE_URL=your_neon_database_url
DB_MIGRATING=true       # Set only when running migrations
DB_SEEDING=true         # Set only when running seeds
```

---

## Usage

Import the DB client:

```ts
import db from '@workspace/db';
```

Run migrations:

```bash
pnpm --filter @workspace/db run migrate
```

Run seeds:

```bash
pnpm --filter @workspace/db run seed
```
