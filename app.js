"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, './.env') });
// import db from './database/mongodb';
// import authenticateSession from './middleware/authenticateSession';
// import attendanceRoute from './routes/attendance';
// import attendanceTokenRoute from './routes/attendanceToken';
// import registerRoute from './routes/register';
// db.connect();
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_session_1.default({
    secret: process.env.CLIENT_SECRET,
    saveUninitialized: false,
    resave: true,
}));
app.set('view engine', 'ejs');
app.set('views', 'views');
// app.use('/attendance', attendanceRoute);
// app.use('/register', registerRoute);
// app.use('/attendance-token', attendanceTokenRoute);
app.get('/', (req, res, next) => {
    res.send('dsf');
});
// app.use('/', authenticateSession);
exports.default = app;
