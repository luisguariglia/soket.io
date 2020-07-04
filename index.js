/*var app = require('express')();*/
var express=require("express");
var app=express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use("/scripts", express.static(__dirname + '/public/javascripts'));

// development only
/*if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}*/
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
  /*io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
  });*/
  io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
http.listen(3000, () => {
  console.log('listening on *:3000');
});