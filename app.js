const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));
app.use('/phaser', express.static('node_modules/phaser-ce/build/'));
app.use('/shared', express.static('shared'));
app.use('/assets', express.static('assets'));

server.listen(process.env.PORT || 8080, function() {
	console.log('Listening on ' + server.address().port);
});

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {

});