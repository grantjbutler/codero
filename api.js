var fs = require('fs'),
	path = require('path'),
	Runner = require('./runner').Runner,
	allBlocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'blocks.json')));

exports.API = function(io, sphero) {
	io.sockets.on('connection', function(socket) {
		socket.on('blocks', function() {
			console.log('emitting blocks');
			
			socket.emit('blocks', allBlocks);
		});
		
		socket.on('run', function(blocks) {
			var aRunner = new Runner(blocks, socket, sphero);
			aRunner.run();
		});
	});
}