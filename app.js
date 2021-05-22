"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
const mongodb_1 = __importDefault(require("./database/mongodb"));
const authenticateSession_1 = __importDefault(require("./middleware/authenticateSession"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const attendanceToken_1 = __importDefault(require("./routes/attendanceToken"));
const register_1 = __importDefault(require("./routes/register"));
mongodb_1.default.connect();
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
app.use('/attendance', attendance_1.default);
app.use('/register', register_1.default);
app.use('/attendance-token', attendanceToken_1.default);
app.get('/', (req, res, next) => {
    res.send('works');
    console.log('paththhhh');
});
app.use('/', authenticateSession_1.default);
exports.default = app;
