"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', '.env') });
const MONGO_DB_DB = process.env.MONGO_DB_DB;
const MONGO_DB_CLUSTER = process.env.MONGO_DB_CLUSTER;
const MONGO_DB_PASS = process.env.MONGO_DB_PASS;
const MONGO_DB_ADMIN = process.env.MONGO_DB_ADMIN;
exports.default = () => mongoose_1.default
    .connect(`mongodb+srv://${MONGO_DB_ADMIN}:${MONGO_DB_PASS}@${MONGO_DB_CLUSTER}.ncb4w.mongodb.net/${MONGO_DB_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then((m) => m.connection.getClient());
