import Express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
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

const clientP = mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_ADMIN!}:${process.env
      .MONGO_DB_PASS!}@${process.env.MONGO_DB_CLUSTER}.ncb4w.mongodb.net/${
      process.env.MONGO_DB_DB
    }?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((m) => m.connection.getClient())
  .catch((e: Error): never => {
    console.log(e);
    throw e;
  });
console.log(process.env.CLIENT_SECRET);
app.use(Express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'ds',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: clientP,
      dbName: process.env.MONGO_DB_DB!,
      stringify: false,
      ttl: 60 * 24 * 60 * 60,
    }),
  })
);

app.get('/', (req, res, next) => {
  req.session.foo = 'sfd';
  res.send('dfsf');
});

app.use('/attendance', attendanceRoute);
app.use('/register', registerRoute);
app.use('/attendance-token', attendanceTokenRoute);

app.use('/', authenticateSession);

export default app;
