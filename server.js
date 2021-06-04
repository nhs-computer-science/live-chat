"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, './env', '.env') });
const PORT = process.env.PORT || 5000;
// const io = new Server(PORT);
// io.on('connection', (socket) => {
//   console.log(`connect ${socket.id}`);
// });
app_1.default.listen(PORT, () => {
    console.log(`Listening to request on port ${PORT}`);
});
