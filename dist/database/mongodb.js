"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const child_process_1 = __importDefault(require("child_process"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../', '../', '.env') });
mongoose_1.default.set('useNewUrlParser', true);
mongoose_1.default.set('useUnifiedTopology', true);
mongoose_1.default.set('useFindAndModify', false);
class Database {
    constructor() {
        this.connect = async () => {
            mongoose_1.default.connect(`mongodb+srv://${this.MONGO_DB_ADMIN}:${this.MONGO_DB_PASS}@${this.MONGO_DB_CLUSTER}.ncb4w.mongodb.net/${this.MONGO_DB_DB}?retryWrites=true&w=majority`)
                .then(() => {
                child_process_1.default.exec('path', (error, stdout, stderr) => {
                    this.errorHandler(error, stderr);
                    console.log(stdout);
                });
                child_process_1.default.execFile('{executableFile}', (error, stdout, stderr) => {
                    this.errorHandler(error, stderr);
                    console.log(stdout);
                });
                child_process_1.default.spawn('path', ['path']).on('exit', (code, signal) => {
                    code ? console.log(`process exit code: ${code}`) : null;
                    signal ? console.log(`Process killed with signal: ${signal}`) : null;
                    console.log('✅');
                });
                console.log('Database connection established');
            })
                .catch((err) => {
                this.throwError(err);
            });
        };
        this.errorHandler = (error, stderr) => {
            error ? this.throwError(error.message) : null;
            stderr ? this.throwError(stderr) : null;
        };
        this.throwError = (err) => {
            console.log(err);
            throw err;
        };
        this.MONGO_DB_PASS = process.env.MONGO_DB_PASS;
        this.MONGO_DB_CLUSTER = process.env.MONGO_DB_CLUSTER;
        this.MONGO_DB_DB = process.env.MONGO_DB_DB;
        this.MONGO_DB_ADMIN = process.env.MONGO_DB_ADMIN;
        this.connect();
    }
}
exports.default = new Database();
