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
	
	var blocks = [];
	
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
			compGrid.append($('<div class="block block-class-' + item.class + ' block-type-' + item.type + '"><h4>' + item.name + '</h4></div>'));
		});
		
		blocks = data;
		
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
				
				ui.offset.top += 10; // This is to take into account the margin;
				ui.offset.left += 10; // This is to take into account the margin;
				
				setTimeout(function() {
					jsPlumb.addEndpoint(blockID, TargetEndpoint);
					jsPlumb.addEndpoint(blockID, SourceEndpoint);
				}, 0);
				
				view.click(function() {
					var self = $(this);
					var blockClass = (/ block-class-([^ ]+) /.exec(self.attr('class')))[1];
					var paramPane = $('#paramPane');
					
					paramPane.empty();
					
					if(!self.hasClass('selected')) {
						$('.block.selected').removeClass('selected');
						
						self.addClass('selected');
						
						for(var i = 0; i < blocks.length; i++) {
							var block = blocks[i];
							
							if(block['class'] != blockClass) {
								continue;
							}
							
							block.params.forEach(function(param) {
								var p = $('<p>' + param.title + ': <input type="' + param.type + '" name="' + param.name + '"></p>');
								var input = p.find('input');
								
								var params = $('#' + blockID).data('params');
								if(params && (param.name in params)) {
									input.val(params[param.name]);
								}
								
								input.blur(function() {
									var params = $('#' + blockID).data('params');
									
									if(!params) {
										params = {};
									}
									
									params[param.name] = $(this).val();
									
									$('#' + blockID).data('params', params);
								});
								paramPane.append(p);
							});
						}
					} else {
						self.removeClass('selected');
					}
				});
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
	
	var running = false;
	
	socket.on('run', function(block) {
		$('.active').removeClass('active');
		$('#' + block.block).addClass('active');
	});
	
	socket.on('done', function() {
		$('.active').removeClass('active');
		
		running = false;
	});
	
	function coderoRun() {
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
				
		socket.emit('run', steps);
		
		running = true;
	}
	
	$('#run').click(function() {
		if(running) {
			
		} else {
			coderoRun();
		}
	});
});