let io;

function init(server) {
    io = require('socket.io')(server);
    io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

function notifyClients(transaction) {
    if (io) {
        io.sockets.emit('new-transaction', transaction);
    }
}

module.exports = { init, notifyClients };