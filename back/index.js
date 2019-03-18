/**
 * Created by mayl on 18/03/19.
 */

var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on("connection", socket => {
  
    socket.on("test", message => {
      socket.emit("response", message);
    });

    socket.on("timer", () => {
        let a = 0;
        const i = setInterval(() => {
            socket.emit("timer", a++);
        }, 2000);
        setTimeout(() => {
            clearInterval(i);
        }, 10000);
    });
});

app.get('/', function (req, res) {
    return res.status(200)
        .json({value: "it works !"})
});

server.listen(4444);