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
  socket.on('message', (args) => {
    socket.emit('message', args)
  })
  socket.on("disconnect", () => {
    console.log('disconnected')
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