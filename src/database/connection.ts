import knex from 'knex';
import { resolve } from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

pg.defaults.ssl = process.env.NODE_ENV === 'development' ? false : true;
console.log(pg.defaults.ssl);
dotenv.config({
    path: resolve(__dirname, '..', '..', '.env'),
});

const connection = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    searchPath: ['knex', 'public'],
    pool: {
        min: 0,
        max: 20,
    },
    useNullAsDefault: true,
});

export default connection;
