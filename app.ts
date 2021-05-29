import Express from 'express';
// import MongoStore from 'connect-mongo';
// import session from 'express-session';
import bodyParser from 'body-parser';
import db from './database/mongodb';
import dotenv from 'dotenv';
import path from 'path';

// import authenticateSession from './middleware/authenticateSession';

import attendanceRoute from './routes/attendance';
import attendanceTokenRoute from './routes/attendanceToken';
import registerRoute from './routes/register';

const app = Express();

db.connect();

dotenv.config({ path: path.join(__dirname, './.env') });

app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(Express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: process.env.CLIENT_SECRET!,
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//       mongoUrl:
//         'mongodb+srv://admin-alex:xs5l99f2NdiAlTL1@nhs-computer-science-li.ncb4w.mongodb.net/nhs-computer-science-live-chat-db?retryWrites=true&w=majority',
//     }),
//   })
// );

app.get('/', (req, res, next) => {
  res.send('dfsf');
});
app.use('/attendance', attendanceRoute);
app.use('/register', registerRoute);
app.use('/attendance-token', attendanceTokenRoute);

// app.use('/', authenticateSession);

export default app;
