var server = require('http').createServer();
var sio = require('socket.io')(server);

var socketUtil = require('./utils/socket/');

var TanksSet = require('./biz/tanks-set/');
var Tank = require('./biz/tank/');

sio.on('connection', socket => {
  // TanksSet.add(new Tank(socketUtil.getUid(socket)));
  
  socket.on('direction', (e) => {
    console.log(e);
  });
});


server.listen(3000);