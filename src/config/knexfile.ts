import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({
    path: resolve(__dirname, '..', '..', '.env'),
});

module.exports = {
    development: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
        },
        migrations: {
            directory: resolve(__dirname, '..', 'database', 'migrations'),
        },
        useNullAsDefault: true,
    },
    production: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false },
        },
        migrations: {
            directory: resolve(__dirname, '..', 'database', 'migrations'),
        },
        useNullAsDefault: true,
        pool: {
            min: 2,
            max: 10,
        },
    },
};
