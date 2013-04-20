
/**
 * Module dependencies.
 */

var express = require('express')
  , socketIO = require('socket.io')
  , routes = require('./routes')
  , api = require('./api')
  , http = require('http')
  , path = require('path')
  , Sphero = require('node-sphero').Sphero;

var sphero = new Sphero();

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
var io = socketIO.listen(server);

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var API = new api.API(io);

sphero.on('connect', function(ball) {
	API.sphero = ball;
});

sphero.connect();
