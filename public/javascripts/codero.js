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
	var SourceEndpoint = {
		endpoint:"Rectangle",
		paintStyle:{ width:10, height:10, fillStyle:exampleColor },
		isSource:true,
		reattach:true,
		connector: "Straight",
		connectorStyle : {
			lineWidth:5,
			strokeStyle:exampleColor,
		},
		isTarget:false,
		anchor: 'RightMiddle'
	};
	var TargetEndpoint = {
		endpoint:"Rectangle",
		paintStyle:{ width:15, height:15, fillStyle:exampleColor },
		isSource:false,
		reattach:true,
		connector: "Straight",
		connectorStyle : {
			lineWidth:5,
			strokeStyle:exampleColor,
		},
		isTarget:true,
		anchor: 'LeftMiddle'
	};
	
	jsPlumb.addEndpoint('start-block', SourceEndpoint);
	
	var socket = io.connect('http://localhost');
	socket.on('blocks', function (data) {
		var compGrid = $('#components .grid');
		
		data.forEach(function(item) {
			compGrid.append($('<div class="block block-class-' + item.class + ' block-type-' + item.type + '"><h6>' + item.name + '</div>'));
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
					jsPlumb.addEndpoint(blockID, TargetEndpoint);
					jsPlumb.addEndpoint(blockID, SourceEndpoint);
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
	
	window.coderoRun = function() {
		var steps = [];
		
		var connections = jsPlumb.getConnections({
			source: 'start-block'
		});
		
		var connectionId = connections[0].id;
		var targetId = connections[0].targetId;
		
		while(targetId != null) {
			var elm = $('#' + targetId);
			var params = elm.data('params');
			
			var step = {};
			step.id = targetId;
			step.class = (/ block-class-([^ ]+) /.exec(elm.attr('class')))[1];
			step.params = params;
			
			steps.push(step);
			
			connections = jsPlumb.getConnections({
				source: targetId
			});
			
			if(!connections || !connections.length) {
				break;
			}
			
			targetId = connections[0].targetId;
		}
		
		console.log(steps);
				
/* 		socket.emit('run', steps); */
	}
});