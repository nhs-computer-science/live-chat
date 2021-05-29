"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_1 = __importDefault(require("./database/mongodb"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const authenticateSession_1 = __importDefault(require("./middleware/authenticateSession"));
const attendance_1 = __importDefault(require("./routes/attendance"));
const attendanceToken_1 = __importDefault(require("./routes/attendanceToken"));
const register_1 = __importDefault(require("./routes/register"));
const app = express_1.default();
mongodb_1.default.connect();
dotenv_1.default.config({ path: path_1.default.join(__dirname, './.env') });
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(express_session_1.default({
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        mongoUrl: 'mongodb+srv://admin-alex:xs5l99f2NdiAlTL1@nhs-computer-science-li.ncb4w.mongodb.net/nhs-computer-science-live-chat-db?retryWrites=true&w=majority',
    }),
}));
app.use('/attendance', attendance_1.default);
app.use('/register', register_1.default);
app.use('/attendance-token', attendanceToken_1.default);
app.use('/', authenticateSession_1.default);
exports.default = app;
