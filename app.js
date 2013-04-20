
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api')
  , http = require('http')
  , path = require('path')
  , Sphero = require('Sphero').Sphero;

var sphero = new Sphero();

sphero.on('connect', function(ball) {
	var app = express();
	
	app.configure(function(){
	  app.set('port', process.env.PORT || 3000);
	  app.set('views', __dirname + '/views');
	  app.set('view engine', 'jade');
	  app.use(express.favicon());
	  app.use(express.logger('dev'));
	  app.use(express.bodyParser());
	  app.use(express.methodOverride());
	  app.use(app.router);
	  app.use(express.static(path.join(__dirname, 'public')));
	});
	
	app.configure('development', function(){
	  app.use(express.errorHandler());
	});
	
	app.get('/', routes.index);
	app.get('/api/blocks', api.blocks);
	app.post('/api/run', function(req, res) {
		api.run(req, res, ball);
	});
	app.post('/api/execute', function(req, res) {
		api.execute(req, res, sphero);
	})
	
	http.createServer(app).listen(app.get('port'), function(){
	  console.log("Express server listening on port " + app.get('port'));
	});
});

sphero.connect();
