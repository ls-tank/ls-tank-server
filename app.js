var server = require('http').createServer();
var sio = require('socket.io')(server);

var socketUtil = require('./utils/socket/');

var TanksSet = require('./biz/tanks-set/');
var Tank = require('./biz/tank/');

var tankControllers = sio.of('/tankControllers');
var bigScreen = sio.of('/bigScreen');

var clients = {

};

tankControllers.on('connection', socket => {
  
  // 客户端连接
  console.log('player enter');
  var data = socketUtil.getData(socket);
  clients[data.uid] = socket;
  bigScreen.emit('b-enter', {
    data: data
  });

  // 客户端断开
  socket.on('disconnect', event => {
    console.log('player leave');
    var data = socketUtil.getData(socket);
    delete clients[data.uid]
    bigScreen.emit('b-leave', {
      data: data
    });
  });

  // 客户端发来方向控制信息
  socket.on('c-direction', event => {
    bigScreen.emit('b-direction', event);
  });

  // 客户端发来开火信息
  socket.on('c-fire', event => {
    bigScreen.emit('b-fire', event);
  });

  socket.on('c-next', event => {
    var data = socketUtil.getData(socket);
    clients[data.uid] = socket;
    bigScreen.emit('b-enter', {
      data: data
    });
  });
});

bigScreen.on('connection', socket => {
  // 大屏幕链接
  console.log('bigscreen connect');

  socket.on('b-score', event => {
    // console.log(event);
    clients[event.data.winner].emit('c-score', event);
  });

  socket.on('b-boom', event => {
    clients[event.data.loser].emit('c-boom');
  });
});


server.listen(3000);