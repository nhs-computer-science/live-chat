"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const socket_io_1 = __importDefault(require("socket.io"));
const chatFilter_1 = __importDefault(require("./helpers/chatFilter/chatFilter"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, './env', '.env') });
const PORT = process.env.PORT || 5000;
const server = app_1.default.listen(PORT, () => {
    console.log(`Listening to request on port ${PORT}`);
});
const io = socket_io_1.default(server);
io.on('connection', (socket) => {
    socket.on('chat-sent', (data) => {
        console.log(data);
        io.emit('broadcast-message', {
            firstName: data.firstName,
            lastName: data.lastName,
            chat: chatFilter_1.default(data.chat),
            createdAt: data.createdAt,
            isAdmin: data.isAdmin,
            id: socket.id,
        });
    });
});
