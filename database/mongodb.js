"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', '.env') });
mongoose_1.default.set('useNewUrlParser', true);
mongoose_1.default.set('useUnifiedTopology', true);
mongoose_1.default.set('useFindAndModify', false);
class Database {
    constructor() {
        this.connect = async () => {
            mongoose_1.default.connect(this.CONNECTION_URL)
                .then(() => {
                console.log('Database connection established');
            })
                .catch((err) => {
                this.throwError(err);
            });
        };
        this.throwError = (err) => {
            console.log(err);
            throw err;
        };
        this.MONGO_DB_PASS = process.env.MONGO_DB_PASS;
        this.MONGO_DB_CLUSTER = process.env.MONGO_DB_CLUSTER;
        this.MONGO_DB_DB = process.env.MONGO_DB_DB;
        this.MONGO_DB_ADMIN = process.env.MONGO_DB_ADMIN;
        this.CONNECTION_URL = process.env.MONGODB_URI;
        this.connect();
    }
}
exports.default = new Database();
