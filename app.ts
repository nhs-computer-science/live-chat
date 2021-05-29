import Express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import bodyParser from 'body-parser';
import db from './database/mongodb';
import dotenv from 'dotenv';
import path from 'path';

import attendanceRoute from './routes/attendance';
import attendanceTokenRoute from './routes/attendanceToken';
import registerRoute from './routes/register';

import authenticateSession from './middleware/authenticateSession';

const app = Express();

dotenv.config({ path: path.join(__dirname, './.env') });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(Express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'foo',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: db(),
      dbName: process.env.MONGO_DB_DB!,
      stringify: false,
      autoRemove: 'disabled',
    }),
  })
);

app.get('/', (req, res, next) => {
  req.session.m = Math.random().toString();
  res.send('dfsf');
});

app.use('/attendance', attendanceRoute);
app.use('/register', registerRoute);
app.use('/attendance-token', attendanceTokenRoute);

app.use('/', authenticateSession);

export default app;
