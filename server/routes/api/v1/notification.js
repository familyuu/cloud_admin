function notification(ioSocket){
  ioSocket.sockets.emit('notification', 'A notification test come form cloud');
}

exports.notification = notification;