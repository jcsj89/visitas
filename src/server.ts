import 'reflect-metadata';
import './typeorm/index';
import express from 'express';
import { resolve } from 'path';
import dotenv from 'dotenv';
dotenv.config();
import routes from './routes'; // manager routes
const app = express();

app.set('view engine', 'ejs');
app.set('views', resolve(__dirname, 'views'));

// routes
app.use(routes);

app.listen(3333, () => {
    console.log('Server stared on port 3333!');
    console.log(__dirname);
});
