import knex from 'knex';
import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: resolve(__dirname, '..', '..', '.env'),
});

const connection = knex({
    client: 'pg',
    connection: process.env.DATABASE_URL,
    //searchPath: ['knex', 'public'],
    useNullAsDefault: true,
});

export default connection;
