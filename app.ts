import Express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';

// import db from './database/mongodb';
// import authenticateSession from './middleware/authenticateSession';

// import attendanceRoute from './routes/attendance';
// import attendanceTokenRoute from './routes/attendanceToken';
// import registerRoute from './routes/register';

// db.connect();
const app = Express();

app.use(Express.static(path.join(__dirname, './public')));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(
//   session({
//     secret: process.env.CLIENT_SECRET!,
//     saveUninitialized: false,
//     resave: true,
//   })
// );

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