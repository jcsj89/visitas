import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config({
    path: resolve(__dirname, '..', '..', '.env'),
});

module.exports = {
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
    },
    migrations: {
        directory: resolve(__dirname, '..', 'database', 'migrations'),
    },
    useNullAsDefault: true,
};
