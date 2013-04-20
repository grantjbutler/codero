var fs = require('fs'),
	path = require('path'),
	allBlocks = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'blocks.json')));

exports.API = function(io) {
	this.sphero = null;
	
	var self = this;
	
	io.sockets.on('connection', function(socket) {
		socket.on('blocks', function() {
			console.log('emitting blocks');
			
			socket.emit('blocks', allBlocks);
		});
		
		socket.on('run', function(blocks) {
			var aRunner = new Runner(blocks, socket, self.sphero);
			aRunner.run();
		});
	});
}