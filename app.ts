import Express from 'express';
import session from 'cookie-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, './.env') });

// import db from './database/mongodb';
// import authenticateSession from './middleware/authenticateSession';

// import attendanceRoute from './routes/attendance';
// import attendanceTokenRoute from './routes/attendanceToken';
// import registerRoute from './routes/register';

// db.connect();
const app = Express();

app.set('trust proxy', 1) // trust first proxy

app.use(Express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.CLIENT_SECRET!,
    name: 'session',
    keys: ['key1', 'key2']
  })
);

console.log(process.env.CLIENT_SECRET)

app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use('/attendance', attendanceRoute);
// app.use('/register', registerRoute);
// app.use('/attendance-token', attendanceTokenRoute);

app.get('/', (req, res, next) => {
  res.send('dsf');
});

// app.use('/', authenticateSession);

export default app;