var socket = io();
$(document).ready(function(){
  socket.on('message', function(message){
    console.log(`hello world ${message}`);
  });
});