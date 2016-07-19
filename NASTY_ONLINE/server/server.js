//=============================================================================
// Nasty Server
// Version: 1.0.0
//=============================================================================

var app = require('http').createServer();
var io = require('socket.io')(app);

app.listen(8000);
console.log('Server is on Broseph');

// ADD SERVER MODULES HERE:
var nastyPassiveMMO = require('./socket_modules/nastyPassiveMMO');
var nastyLoginSystem = require('./socket_modules/loginSystem');
var nastyDBConnection = require('./socket_modules/loginDBConnection');


//Pre Socket Processes Here (Mostly for Database connections)
nastyDBConnection();

//When first connected to Socket.io
io.on('connection', function(socket){

  //Bind Socket Modules
  nastyPassiveMMO(socket, io);
  nastyLoginSystem(socket, io);


  socket.on('disconnect', function(socket){

  });
});
