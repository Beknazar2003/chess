const io = require('socket.io')(5000);
io.on('connection', (socket) => {
    console.log('connect')
    socket.on('move', move => {
        socket.emit('move', move)
    })
});