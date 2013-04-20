
/**
 * Module dependencies.
 */

var express = require('express')
  , socketIO = require('socket.io')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , Sphero = require('node-sphero').Sphero;

var sphero = new Sphero();

sphero.on('connect', function(ball) {
	var app = express();
	
	app.configure(function(){
	  app.set('port', process.env.PORT || 3000);
	  app.set('views', __dirname + '/views');
	  app.set('view engine', 'ejs');
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
	
	var server = http.createServer(app);
	socketIO.listen(server);
	require('./api').api(socketIO, sphero);
	server.listen(app.get('port'), function(){
	  console.log("Express server listening on port " + app.get('port'));
	});
});

sphero.connect();
