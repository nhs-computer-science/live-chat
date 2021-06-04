import path from 'path';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import app from './app';

dotenv.config({ path: path.join(__dirname, './env', '.env') });

const PORT = process.env.PORT! || 5000;

// const io = new Server(PORT);

// io.on('connection', (socket) => {
//   console.log(`connect ${socket.id}`);
// });

app.listen(PORT, (): void => {
  console.log(`Listening to request on port ${PORT}`);
});
