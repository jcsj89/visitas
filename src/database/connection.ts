import knex from 'knex';
import { resolve } from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({
    path: resolve(__dirname, '..', '..', '.env'),
});

const connection = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    },
    searchPath: ['knex', 'public'],
    pool: {
        min: 0,
        max: 20,
    },
    useNullAsDefault: true,
});

export default connection;
