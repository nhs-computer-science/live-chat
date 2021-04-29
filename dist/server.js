"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../config.env') });
const app = express_1.default();
app.use(express_session_1.default({
    secret: process.env.CLIENT_SECRET,
    saveUninitialized: false,
    resave: true
}));
app.use('/', (err, req, res, next) => {
    console.log(req.body);
    res.send('fdsfd');
    if (err)
        throw err;
    next();
});
const DEFAULT_PORT = process.env.DEFAULT_PORT;
const PORT = process.env.PORT;
const listener = (PORT_NUMBER) => console.log(`Listening to requests on port ${PORT_NUMBER}`);
app.listen(DEFAULT_PORT, () => {
    listener(DEFAULT_PORT);
}).on('error', (e) => {
    if (e.message.includes('EADDRINUSE')) {
        app.listen(PORT, () => listener(PORT));
    }
});
