import express from 'express';
import path from 'path';
import helmet from 'helmet';
import dotenv from 'dotenv';
dotenv.config();
import { flash } from 'express-flash-message';
import cors from 'cors';
import session from 'express-session';
import routes from './routes'; // manager routes
const app = express();
////////////////STORE SESSION IN SQLITE////////////////////////////////////////
import sqliteStoreFactory from 'express-session-sqlite';
import sqlite3 from 'sqlite3';
////////////////////////////////////////////////////////

//view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

//app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));

const SqliteStore = sqliteStoreFactory(session);
//secret session
const secret = process.env.SESSION_SECRET || 'ASD6XCV8FGH5QE3DFG7GHJ5SDF9';
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
        secret: secret,
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 600000,
        },
        //... don't forget other expres-session options you might need
    }),
);

// apply express-flash-message middleware
app.use(flash({ sessionKeyName: 'flashMessage' }));

// routes
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server startup!');
});
