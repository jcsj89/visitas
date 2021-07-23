import express from 'express';
import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import session from 'express-session';
import routes from './routes'; // manager routes
const app = express();
////////////////STORE SESSION IN SQLITE////////////////////////////////////////
import sqliteStoreFactory from 'express-session-sqlite';
import sqlite3 from 'sqlite3';
////////////////////////////////////////////////////////
app.use(cors());

//view engine
app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'views'));

app.use(express.json());
app.use(express.static('public'));
express.urlencoded({ extended: false });

const SqliteStore = sqliteStoreFactory(session);

app.use(
    session({
        store: new SqliteStore({
            // Database library to use. Any library is fine as long as the API is compatible
            // with sqlite3, such as sqlite3-offline
            driver: sqlite3.Database,
            // for in-memory database
            // path: ':memory:'
            path: './src/database/session.sqlite',
            // Session TTL in milliseconds
            ttl: 600000,
            // (optional) Adjusts the cleanup timer in milliseconds for deleting expired session rows.
            // Default is 5 minutes.
            cleanupInterval: 600000,
        }),
        secret: 'lasjkdkasjdjklasdjkl',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000,
        },
        //... don't forget other expres-session options you might need
    }),
);

// routes
app.use(routes);

app.listen(3333, () => {
    console.log('Server stared on port 3333!');
    console.log('http://localhost:3333 ');
});
