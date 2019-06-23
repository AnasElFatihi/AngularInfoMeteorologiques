const  express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();

app.get("/",(req,res) =>{
  res.send("Informations meteorologique NodejS Server");
});

const server =  http.Server(app);

server.listen("4000");

const io = socketIo(server);

io.on("connection", (socket) => {

    socket.emit("data", {
      "data1": "hello "
    });

    socket.on("notification" ,  (data) => {
       io.emit("notification" , data);
    });
});

