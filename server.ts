import dotenv from 'dotenv';
import path from 'path';

import app from './app';

const PORT = process.env.PORT! || 3000;

app.listen(PORT.toString(), (): void => {
  console.log(`Listening to request on port ${PORT}`);
});
