var Sphero = require('node-sphero');
var sphero = new Sphero.Sphero();

sphero.on('connected', function(ball) {
	ball.setRGBLED(0, 255, 0, false);
	
	ball.roll(0, 0.5);
	
	setTimeout(function() {
		ball.roll(0, 0);
	}, 2000);
});

sphero.connect();
