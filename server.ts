import dotenv from 'dotenv';
import path from 'path';

import listener from './util/listener';
import app from './app';

dotenv.config({ path: path.join(__dirname, '.env')});

let DEFAULT_PORT: number | string = 5000;
let FALLBACK_PORT: number | string = 3000;

console.log(DEFAULT_PORT, FALLBACK_PORT);

app.listen(DEFAULT_PORT || FALLBACK_PORT, (): void => {
    listener(DEFAULT_PORT || FALLBACK_PORT);
});