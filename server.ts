import path from 'path';
import dotenv from 'dotenv';
import app from './app';
import socket from 'socket.io';
import chatFilter from './helpers/chatFilter/chatFilter';

dotenv.config({ path: path.join(__dirname, './env', '.env') });

const PORT = process.env.PORT! || 5000;

const server = app.listen(PORT, (): void => {
  console.log(`Listening to request on port ${PORT}`);
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('Made socket connection');

  socket.on('chat-sent', (data) => {
    console.log(data);
    io.emit('broadcast-message', {
      firstName: data.firstName,
      lastName: data.lastName,
      chat: chatFilter(data.chat),
      createdAt: data.createdAt,
      isAdmin: data.isAdmin,
      id: socket.id,
    });
  });
});
