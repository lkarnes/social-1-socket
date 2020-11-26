const express = require("express");
const http = require("http");
const cors = require('cors');
const socketIo = require("socket.io");

const port = process.env.PORT || 4001;
const index = require("./routes/index.js");

const app = express();
app.set('origins', '*:*');
app.use(index);
app.use(cors());
const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  socket.on('send', listener)
  socket.emit('person2', 'hello')
  socket.on('message', (args) => {
    socket.emit('returnmessage', args)
    console.log(args)
  })
  if (interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log('disconnected')
    clearInterval(interval);
  });
});

const listener = (arg) => {
  console.log(arg)
}

const getApiAndEmit = socket => {
  const response = new Date();
  // Emitting a new message. Will be consumed by the client
  socket.emit("FromAPI", response);
};

server.listen(port, () => console.log(`Listening on port ${port}`));