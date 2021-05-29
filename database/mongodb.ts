import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../', '.env') });

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

class Database {
  constructor() {
    this.connect();
  }

  connect = async (): Promise<void> => {
    mongoose
      .connect(
        `mongodb+srv://${process.env.MONGO_DB_ADMIN!}:${
          process.env.MONGO_DB_PASS
        }@${process.env.MONGO_DB_CLUSTER!}.ncb4w.mongodb.net/${process.env
          .MONGO_DB_DB!}?retryWrites=true&w=majority`
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
  };
}

export default new Database();
