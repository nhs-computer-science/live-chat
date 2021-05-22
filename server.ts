import dotenv from 'dotenv';
import path from 'path';

import listener from './util/listener';
import app from './app';

dotenv.config({ path: path.join(__dirname, '.env')});

const PORT: number | string = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('listening to request on port ' + PORT);
});