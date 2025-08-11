import { Table, getTableName, sql } from 'drizzle-orm';
import env from '@workspace/db/config/config';

import * as schema from '@workspace/db/schema';
import * as seeds from '@workspace/db/seeds';

import db, { type db as dbType } from '.';

if (env.DB_SEEDING) {
    throw new Error('You must set DB_SEEDING to "true" when running seeds');
}

async function resetTable(db: dbType, table: Table) {
    return db.execute(sql.raw(`TRUNCATE TABLE ${getTableName(table)} RESTART IDENTITY CASCADE`));
}

async function main() {
    for (const table of [
        // schema.orderMenuItem,
        // schema.orderStatus,
        // schema.order,
        // schema.address,
        // schema.user,
        // schema.menuItem,
        // schema.category,
        // schema.statusCatalog,
        // schema.restaurant,
        // schema.city,
        // schema.state
    ]) {
        // await db.delete(table); // clear tables without truncating / resetting ids
        await resetTable(db, table);
    }

    try {
        // await seeds.category(db);
        // await seeds.statusCatalog(db);
        // await seeds.state(db);
        // await seeds.city(db);
        // await seeds.restaurant(db);
        // await seeds.user(db);
        // await seeds.order(db);
        console.log('Seeding completed');
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
}

main();
