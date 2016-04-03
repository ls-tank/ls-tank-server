var server = require('http').createServer();
var sio = require('socket.io')(server);

var socketUtil = require('./utils/socket/');

var TanksSet = require('./biz/tanks-set/');
var Tank = require('./biz/tank/');

var tankControllers = sio.of('/tankControllers');
var bigScreen = sio.of('/bigScreen');

tankControllers.on('connection', socket => {

  // 客户端连接
  console.log('player enter');
  console.log(socketUtil.getData(socket))
  bigScreen.emit('b-enter', {
    data: socketUtil.getData(socket)
  });

  // 客户端断开
  socket.on('disconnect', event => {
    console.log('player leave');
    bigScreen.emit('b-leave', {
      data: socketUtil.getData(socket)
    });
  });

  // 客户端发来方向控制信息
  socket.on('c-direction', event => {
    console.log(event);
    bigScreen.emit('b-direction', event);
  });

  // 客户端发来开火信息
  socket.on('c-fire', event => {
    console.log(event);
    bigScreen.emit('b-fire', event);
  });
});

bigScreen.on('connection', socket => {
  // 大屏幕链接
  console.log('bigscreen connect');
});


server.listen(3000);