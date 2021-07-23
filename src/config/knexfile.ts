import { resolve } from 'path';

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: resolve(__dirname, '..', 'database', 'db.sqlite'),
    },
    migrations: {
        directory: resolve(__dirname, '..', 'database', 'migrations'),
    },
    useNullAsDefault: true,
};
