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
	
	var exampleColor = "#00f";
	var sourceEndpoint = {
		endpoint:"Dot",
		paintStyle:{ width:10, height:10, fillStyle:exampleColor },
		isSource:true,
		reattach:true,
		scope:"source",
		connectorStyle : {
			lineWidth:5,
			strokeStyle:exampleColor,
		},
		isTarget:false,
	};
	var TargetEndpoint = {
		endpoint:"Rectangle",
		paintStyle:{ width:15, height:15, fillStyle:exampleColor },
		isSource:false,
		reattach:true,
		scope:"target",
		connectorStyle : {
			gradient:{stops:[[0, exampleColor], [0.5, "#09098e"], [1, exampleColor]]},
			lineWidth:5,
			strokeStyle:exampleColor,
			dashstyle:"2 2"
		},
		isTarget:true,
	};
	
	jsPlumb.addEndpoint('start-block', { anchor: 'RightMiddle' }, sourceEndpoint);
	
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
				var blockID = 'block-' + guid();
				view.attr('id', blockID);
				view.removeClass('ui-draggable');
				view.removeClass('ui-draggable-dragging');
				
				setTimeout(function() {
					jsPlumb.addEndpoint(blockID, { anchor: 'LeftMiddle' }, TargetEndpoint);
					jsPlumb.addEndpoint(blockID, { anchor: 'RightMiddle' }, sourceEndpoint);
				}, 0);
			}
			
			var offset = gridView.offset();
			offset.top = ui.offset.top - offset.top;
			offset.left = ui.offset.left - offset.left;
			
			view.css(offset);
			gridView.append(view);
			setTimeout(function() {
				jsPlumb.draggable(view.attr('id'));
			}, 0);
		}
	});
	
	socket.emit('blocks');	
});