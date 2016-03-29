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
  TanksSet.set(socketUtil.getUid(socket), new Tank());
  bigScreen.emit('b-enter', {
    uid: socketUtil.getUid(socket)
  });

  // 客户端断开
  socket.on('disconnect', event => {
    console.log('player leave');
    var uid = socketUtil.getUid(socket);
    TanksSet.remove(uid);
    bigScreen.emit('b-leave', {
      uid: socketUtil.getUid(socket)
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

});


server.listen(3000);