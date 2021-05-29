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

const clientP = mongoose
  .connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((m) => {
    console.log('connection established');
    return m.connection.getClient();
  });

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
      clientPromise: clientP,
      dbName: process.env.MONGO_DB,
      stringify: false,
      autoRemove: 'interval',
      autoRemoveInterval: 1,
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
