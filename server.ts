import dotenv from 'dotenv';
import path from 'path';

import listener from './util/listener';
import app from './app';

dotenv.config({ path: path.join(__dirname, '.env')});

let DEFAULT_PORT: number | string;
let FALLBACK_PORT: number | string;

process.env.MODE === 'production' ? DEFAULT_PORT = 3000 : DEFAULT_PORT = process.env.DEFAULT_PORT!;
process.env.MODE === 'production' ? FALLBACK_PORT = 5000 : FALLBACK_PORT = process.env.FALLBACK_PORT!;

console.log(DEFAULT_PORT, FALLBACK_PORT);

app.listen(DEFAULT_PORT || FALLBACK_PORT, (): void => {
    listener(DEFAULT_PORT || FALLBACK_PORT);
});