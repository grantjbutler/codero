var fs = require('fs'),
	path = require('path',)
	blocks = fs.readFileSync(path.resolve(__dirname, 'blocks.json'));

exports.blocks = function(req, res) {
	res.json(blocks);
};

exports.run = function(req, res, sphero) {
	var blocks = req.body;
	
	
};

exports.execute = function(req, res, sphero) {
	
};