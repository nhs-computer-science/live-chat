import Express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';

import path from 'path';
import child_process from 'child_process';

import db from './database/mongodb';
db.connect();
const app = Express();

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(Express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.CLIENT_SECRET!,
    saveUninitialized: false,
    resave: true
  })
);

export default app;