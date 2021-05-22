import dotenv from 'dotenv';
import path from 'path';

import listener from './util/listener';
import app from './app';

dotenv.config({ path: path.join(__dirname, '.env')});

let DEFAULT_PORT: number | string = process.env.DEFAULT_PORT!
let FALLBACK_PORT: number | string = process.env.FALLBACK_PORT!

app.listen(DEFAULT_PORT || FALLBACK_PORT, () => {
    console.log('listening to request on port ' + DEFAULT_PORT || FALLBACK_PORT);
});