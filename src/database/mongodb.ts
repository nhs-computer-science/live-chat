import mongoose from 'mongoose';
import dotenv from 'dotenv';

import path from 'path';
import child_process from 'child_process';

dotenv.config({ path: path.join(__dirname, '../', '../', '.env') });

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

class Database {
    private MONGO_DB_PASS: string;
    private MONGO_DB_CLUSTER: string;
    private MONGO_DB_DB: string;
    private MONGO_DB_ADMIN: string;

    constructor() {
        this.MONGO_DB_PASS = process.env.MONGO_DB_PASS!;
        this.MONGO_DB_CLUSTER = process.env.MONGO_DB_CLUSTER!;
        this.MONGO_DB_DB = process.env.MONGO_DB_DB!;
        this.MONGO_DB_ADMIN = process.env.MONGO_DB_ADMIN!;

        this.connect();
    }

    connect = async (): Promise<void> => {
        mongoose.connect(
            `mongodb+srv://${this.MONGO_DB_ADMIN}:
            ${this.MONGO_DB_PASS}@${this.MONGO_DB_CLUSTER}.
            ncb4w.mongodb.net/${this.MONGO_DB_DB}
            ?retryWrites=true&w=majority`
        )
        .then((): void => {
            child_process.exec('path', (error, stdout, stderr) => {
                this.errorHandler(error, stderr);
                console.log(stdout);
            });

            child_process.execFile('{executableFile}', (error, stdout, stderr) => {
                this.errorHandler(error, stderr);
                console.log(stdout);
            });

            child_process.spawn('path', ['path']).on('exit', (code, signal) => {
                code ? console.log(`process exit code: ${code}`) : null;
                signal ? console.log(`Process killed with signal: ${signal}`) : null;
                console.log('✅');
            });

            console.log('Database connection established');
        })
        .catch((err): void => {
            this.throwError(err);
        });
    };

    errorHandler = (error: child_process.ExecException | null, stderr: string): void => {
        error ? this.throwError(error.message) : null;
        stderr ? this.throwError(stderr) : null;
    };

    throwError = (err: string): never => {
        console.log(err);
        throw err;
    }
}

export default new Database();
