var fs = require('fs'),
	path = require('path'),
	allBlocks = fs.readFileSync(path.resolve(__dirname, 'blocks.json'));

exports.api = function(io, sphero) {
	io.sockets.on('connection', function(socket) {
		socket.emit('blocks', allBlocks);
		
		socket.on('run', function(blocks) {
			var aRunner = new Runner(blocks, socket, sphero);
			aRunner.run();
		});
	});
}