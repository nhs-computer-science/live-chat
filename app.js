"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const express_session_1 = __importDefault(require("express-session"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// import authenticateSession from './middleware/authenticateSession';
const attendance_1 = __importDefault(require("./routes/attendance"));
const attendanceToken_1 = __importDefault(require("./routes/attendanceToken"));
const register_1 = __importDefault(require("./routes/register"));
const app = express_1.default();
// db.connect();
dotenv_1.default.config({ path: path_1.default.join(__dirname, './.env') });
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express_1.default.static(path_1.default.join(__dirname, './public')));
app.use(body_parser_1.default.urlencoded({ extended: false }));
const clientP = mongoose_1.default
    .connect('mongodb+srv://admin-alex:xs5l99f2NdiAlTL1@nhs-computer-science-li.ncb4w.mongodb.net/nhs-computer-science-live-chat-db?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((m) => {
    console.log('connection established');
    return m.connection.getClient();
});
app.use(express_session_1.default({
    secret: 'foo',
    resave: false,
    saveUninitialized: false,
    store: connect_mongo_1.default.create({
        clientPromise: clientP,
        dbName: 'nhs-computer-science-live-chat-db',
        stringify: false,
        autoRemove: 'interval',
        autoRemoveInterval: 1,
    }),
}));
app.get('/', (req, res, next) => {
    req.session.foo = 'sfd';
    res.send('dfsf');
});
app.use('/attendance', attendance_1.default);
app.use('/register', register_1.default);
app.use('/attendance-token', attendanceToken_1.default);
// app.use('/', authenticateSession);
exports.default = app;
