import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../', '.env') });

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
           'mongodb+srv://admin-alex:xs5l99f2NdiAlTL1@nhs-computer-science-li.ncb4w.mongodb.net/nhs-computer-science-live-chat-db?retryWrites=true&w=majority'
        )
        .then((): void => {
            console.log('Database connection established');
        })
        .catch((err): void => {
            this.throwError(err);
        });
    };

    throwError = (err: string): never => {
        console.log(err);
        throw err;
    }
}

export default new Database();
