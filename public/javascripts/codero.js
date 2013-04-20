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
	
	
		
	var socket = io.connect('http://localhost');
	socket.on('blocks', function (data) {
		var compGrid = $('#components .grid');
		
		data.forEach(function(item) {
			compGrid.append($('<div class="block ' + item.class + '"><h6>' + item.name + '</div>'));
		});
		
		compGrid.find('.block').draggable({
			helper: 'clone'
		});
	});
	
	$('#stage .grid').droppable({
		tolerance: 'intersect',
		drop: function(event, ui) {
			var gridView = $(this);
			var view = ui.draggable;
			
			if(ui.helper[0] != view[0]) {
				view = ui.helper.clone();
				view.attr('id', 'block-' + guid());
			}
			
			var offset = gridView.offset();
			offset.top = ui.offset.top - offset.top;
			offset.left = ui.offset.left - offset.left;
			
			view.css(offset);
			view.draggable({
				start: function(event, ui) {
					if(event.altKey) {
						return false;
					}
					
					return true;
				}
			});
			gridView.append(view);
		}
	});
	
	socket.emit('blocks');	
});