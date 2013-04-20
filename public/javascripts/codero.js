  var socket = io.connect('http://localhost');
  socket.on('blocks', function (data) {
    console.log(data);
    socket.emit('blocks are here', { my: 'data' });
  });