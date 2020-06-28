var express = require("express"),
  app = express(),
  http = require("http"),
  socketIO = require("socket.io"),
  server,
  io;

var socket_list = [];

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

server = http.Server(app);
server.listen(3000);

io = socketIO(server);

io.once("connection", function (socket) {
  socket_list.push(socket);
  socket.on("message", function (message) {
    for (var i = 0; i < socket_list.length; i++) {
      socket_list[i].send(message);
    }
  });
  console.log(socket_list.length);
  socket.on("disconnet", function () {
    socket.removeAllListeners();
    console.log("THe socket disconnectd");
  });
});
