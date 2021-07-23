import knex from 'knex';
import path from 'path';

const sessionConn = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'session.sqlite'),
    },
    useNullAsDefault: true,
});

export default sessionConn;
