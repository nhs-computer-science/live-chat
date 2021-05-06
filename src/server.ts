import dotenv from 'dotenv';

import path from 'path';

import listener from './util/listener';
import app from './app';

dotenv.config({ path: path.join(__dirname, '../.env')});

const DEFAULT_PORT = process.env.DEFAULT_PORT;
const FALLBACK_PORT = process.env.FALLBACK_PORT;

app.listen(DEFAULT_PORT, (): void => {
    listener(DEFAULT_PORT!);
}).on('error', (e: Error): void => {
    if (e.message.includes('EADDRINUSE')) {
        app.listen(FALLBACK_PORT, (): void => listener(FALLBACK_PORT!));
    }
});
