function Runner(blocks, socket, sphero) {
	this.blocks = blocks;
	this.socket = socket;
	this.sphero = sphero;
}

Runner.prototype.run = function run() {
	this.currentBlockIndex = -1;
	
	this.runNextBlock();
};

Runner.prototype.runNextBlock = function() {
	this.currentBlockIndex++;
	
	if(!this.blocks[this.currentBlockIndex]) {
		this.done();
		
		return;
	}
	
	var currentBlock = this.blocks[this.currentBlockIndex];
	
	if(!(currentBlock.class in Runner.Blocks)) {
		this.error({
			'block': currentBlock.id,
			'message': 'Unknown block of type "' + currentBlock.class + '".'
		});
		this.done();
		
		return;
	}
	
	var func = Runner.Blocks[currentBlock.class];
	
	this.socket.emit('run', { 'block': currentBlock.id });
	
	var self = this;
	
	func(currentBlock, this.sphero, this, function() {
		setTimeout(function() {
			self.runNextBlock();
		}, 0);
	});
}

Runner.prototype.error = function(error) {
	this.socket.emit('error', error);
}

Runner.prototype.done = function() {
	this.socket.emit('done');
}

Runner.Blocks = {};
Runner.Blocks['go-forward'] = function(block, sphero, runner, cb) {
	var speed = 0.5;
	
	if('speed' in block.params) {
		speed = block.params.speed;
	}
	
	sphero.roll(0, speed, function() {
		setTimeout(function() {
			sphero.roll(0, 0);
			
			cb();
		}, block.params.time * 1000);
	});
};

Runner.Blocks['set-heading'] = function(block, sphero, runner, cb) {
	sphero.setHeading(block.params.heading, function() {
		cb();
	})
};

Runner.Blocks['change-led'] = function(block, sphero, runner, cb) {
	sphero.setRGBLED(block.params.red, block.params.green, block.params.blue, true, function() {
		cb();
	});
};

exports.Runner = Runner;