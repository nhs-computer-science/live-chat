import Express, { Request, Response } from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';

import attendanceRoute from './routes/attendance/attendance';
import attendanceTokenRoute from './routes/attendance/attendanceToken';
import loginRoute from './routes/auth/login';
import registerRoute from './routes/auth/register';
import homeRoute from './routes/secure/home';

import authenticateSession from './middleware/authenticateSession';

declare module 'express-session' {
  interface Session {
    tentativeClient: object | string;
    client: object;
  }
}

const app = Express();

dotenv.config({ path: path.join(__dirname, './env', '.env') });

const clientP = mongoose
  .connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((m) => m.connection.getClient());

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(Express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.CLIENT_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);

app.get('/', (req: Request, res: Response): void => {
  res.redirect('/register');
});

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/attendance', attendanceRoute);
app.use('/attendance-token', attendanceTokenRoute);

app.use('/', authenticateSession);

app.use('/home', homeRoute);

export default app;
