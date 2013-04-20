$(document).ready(function() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000)
	             .toString(16)
	             .substring(1);
	};
	
	function guid() {
	  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	         s4() + '-' + s4() + s4() + s4();
	}
	
/* 	var  */
	
	var socket = io.connect('http://localhost');
	socket.on('blocks', function (data) {
		var compGrid = $('#components .grid');
		
		data.forEach(function(item) {
			compGrid.append($('<div class="block ' + item.class + '"><h6>' + item.name + '</div>'));
		});
		
		compGrid.shapeshift({
			dragClone: true
		});
	});
	
	$('#stage .grid').shapeshift({
		colWidth: 50,
		align: 'left',
	});
	
	$('#stage .grid').on('ss-added', function(e, selected) {
		console.log(selected);
		selected.id = 'block-' + guid();
		
		
	});
	
	socket.emit('blocks');	
});