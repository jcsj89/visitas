// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config({
    path: path.resolve(__dirname, '..', '..', '.env'),
});

module.exports = {
    development: {
        client: 'pg',
        connection: {
            connectionString: process.env.DATABASE_URL,
        },
        migrations: {
            directory: path.resolve(__dirname, '..', 'database', 'migrations'),
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
            directory: path.resolve(__dirname, '..', 'database', 'migrations'),
        },
        useNullAsDefault: true,
        pool: {
            min: 2,
            max: 10,
        },
    },
};
