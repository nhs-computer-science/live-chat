import dotenv from 'dotenv';
import path from 'path';

import app from './app';

dotenv.config({ path: path.join(__dirname, '.env')});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (): void => {
    console.log(`Listening to request on port ${PORT}`);
});