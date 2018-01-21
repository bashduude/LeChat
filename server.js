const express = require('express');
const app = express();
const port = 5000;
const server = app.listen(port, () => `Server running on port ${port}`);



const io = require('socket.io')(server);
let usercount = 0;

console.log("Users in chat: " + usercount);

io.on('connection', (socket) => {
  console.log('someone connected');
  console.log(socket.id);
  usercount++;

  console.log("Users in chat: " + usercount);

  socket.on('chat message', function(msgarr){
    socket.broadcast.emit('chat message', msgarr);
  });

  socket.on('disconnect', () => {
    console.log('someone disconnected');
    console.log(socket.id);

    usercount--;

    console.log("Users in chat: " + usercount);
  });
});
