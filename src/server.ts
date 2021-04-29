import Express from 'express';
import session from 'express-session';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../config.env')});

const app = Express();

app.use(
    session({
        secret: process.env.CLIENT_SECRET!,
        saveUninitialized: false,
        resave: true
    })
);

app.use('/', (err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    console.log(req.body);
    res.send('fdsfd');
    if (err) throw err;
    next();
});

const DEFAULT_PORT = process.env.DEFAULT_PORT;
const PORT = process.env.PORT;

const listener = (PORT_NUMBER: string) => console.log(`Listening to requests on port ${PORT_NUMBER}`);

app.listen(DEFAULT_PORT, () => {
    listener(DEFAULT_PORT!);
}).on('error', (e) => {
    if (e.message.includes('EADDRINUSE')) {
        app.listen(PORT, () => listener(PORT!));
    }
});
