import Express from 'express';
import session from 'cookie-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

import db from './database/mongodb';
import authenticateSession from './middleware/authenticateSession';

import attendanceRoute from './routes/attendance';
import attendanceTokenRoute from './routes/attendanceToken';
import registerRoute from './routes/register';

db.connect();

const app = Express();

dotenv.config({ path: path.join(__dirname, './.env') });

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(Express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.CLIENT_SECRET!,
    name: process.env.SESSION_NAME!,
    keys: [process.env.FIRST_SESSION_KEY!, process.env.SECOND_SESSION_KEY!]
  })
);

app.use('/attendance', attendanceRoute);
app.use('/register', registerRoute);
app.use('/attendance-token', attendanceTokenRoute);

app.use('/', authenticateSession);

export default app;