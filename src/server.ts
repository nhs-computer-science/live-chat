import dotenv from 'dotenv';
import path from 'path';

import listener from './util/listener';
import app from './app';

dotenv.config({ path: path.join(__dirname, '../.env')});

const DEFAULT_PORT: string = process.env.DEFAULT_PORT!;
const FALLBACK_PORT: string = process.env.FALLBACK_PORT!;

app.listen(DEFAULT_PORT || FALLBACK_PORT, (): void => {
    listener(DEFAULT_PORT || FALLBACK_PORT);
});