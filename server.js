const express = require('express');
const app = express();
const port = 5000;
const server = app.listen(port, () => `Server running on port ${port}`);


app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

  // app.get('/', function(req, res){
  //   res.sendFile(__dirname + '/client/public/index.html');
  // });


const io = require('socket.io')(server);
let usercount = 0;

console.log("Users in chat: " + usercount);

io.on('connection', (socket) => {
  console.log('someone connected');
  console.log(socket.id);
  usercount++;

  console.log("Users in chat: " + usercount);

  socket.on('chat message', function(msg){
    console.log("message: " + msg);
    socket.broadcast.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('someone disconnected');
    console.log(socket.id);

    usercount--;

    console.log("Users in chat: " + usercount);
  });
});
