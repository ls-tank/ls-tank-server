var server = require('http').createServer();
var sio = require('socket.io')(server);

var socketUtil = require('./utils/socket/');

var TanksSet = require('./biz/tanks-set/');
var Tank = require('./biz/tank/');

sio.on('connection', socket => {
  // 客户端连接
  TanksSet.set(socketUtil.getUid(socket), new Tank());

  // 客户端断开
  socket.on('disconnect', event => {
    var uid = socketUtil.getUid(socket);
    TanksSet.remove(uid);
  });

  // 客户端发来方向控制信息
  socket.on('c-direction', event => {
    var tank = TanksSet.get(event.uid);
    tank.setDirection(event.direction);
  });

  // 客户端发来开火信息
  socket.on('c-fire', event => {
    var tank = TanksSet.get(event.uid);
  });
});

server.listen(3000);