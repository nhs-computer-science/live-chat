import path from 'path';
import dotenv from 'dotenv';

import app from './app';

dotenv.config({ path: path.join(__dirname, './env', '.env') });

const PORT = process.env.PORT! || 5000;

app.listen(PORT, (): void => {
  console.log(`Listening to request on port ${PORT}`);
});
