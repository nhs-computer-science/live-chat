import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../', '.env') });

const MONGO_DB_DB: string = process.env.MONGO_DB_DB!;
const MONGO_DB_CLUSTER: string = process.env.MONGO_DB_CLUSTER!;
const MONGO_DB_PASS: string = process.env.MONGO_DB_PASS!;
const MONGO_DB_ADMIN: string = process.env.MONGO_DB_ADMIN!;

export default (): Promise<MongoClient> =>
  mongoose
    .connect(
      `mongodb+srv://${MONGO_DB_ADMIN}:${MONGO_DB_PASS}@${MONGO_DB_CLUSTER}.ncb4w.mongodb.net/${MONGO_DB_DB}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )
    .then((m) => m.connection.getClient());
