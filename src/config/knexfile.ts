import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config({
    path: resolve(__dirname, '..', '..', '.env'),
});

module.exports = {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    // connection: {
    //     host: 'localhost',
    //     user: 'postgres',
    //     password: 'docker',
    //     database: 'taiuva',
    // },
    migrations: {
        directory: resolve(__dirname, '..', 'database', 'migrations'),
    },
    useNullAsDefault: true,
};
