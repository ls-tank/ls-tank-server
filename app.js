var server = require('http').createServer();
var sio = require('socket.io')(server);

sio.on('connection', socket => {
	console.log(socket);
});


server.listen(3000);