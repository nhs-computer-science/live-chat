import Express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import db from './database/mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// import authenticateSession from './middleware/authenticateSession';

import attendanceRoute from './routes/attendance';
import attendanceTokenRoute from './routes/attendanceToken';
import registerRoute from './routes/register';

const app = Express();

// db.connect();

dotenv.config({ path: path.join(__dirname, './.env') });

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(Express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
const clientP = mongoose
  .connect(
    'mongodb+srv://admin-alex:xs5l99f2NdiAlTL1@nhs-computer-science-li.ncb4w.mongodb.net/nhs-computer-science-live-chat-db?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((m) => {
    console.log('connection established');
    return m.connection.getClient();
  });

app.use(
  session({
    secret: 'foo',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      clientPromise: clientP,
      dbName: 'nhs-computer-science-live-chat-db',
      stringify: false,
      autoRemove: 'interval',
      autoRemoveInterval: 1,
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

// app.use('/', authenticateSession);

export default app;
