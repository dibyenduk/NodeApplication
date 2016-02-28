var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs')

http.listen(3000, function(){
  console.log('listening on *:3000');
  
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });  
});

setInterval(function(){
    fs.readFile('Sample.html', 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }        
        io.emit('data', data);
    });
    
}, 3000);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


