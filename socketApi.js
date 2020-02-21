const SocketIO = require('socket.io');
const io = SocketIO();
const socketApi = {};
socketApi.io = io;
const mongoLib = require('./db/mongoLib');

io.on('connection', async socket => {
    const messages = await mongoLib.getDocuments(mongoLib.CHAT_COLLECTION);
    io.sockets.emit('messages', messages);

    socket.on('new-message', async data => {
        console.log('new message', data);
        await mongoLib.insertDocument(mongoLib.CHAT_COLLECTION, data);
        socketApi.sendNotification();
    });
});

socketApi.sendNotification = async () => {
    const messages = await mongoLib.getDocuments(mongoLib.CHAT_COLLECTION);
    io.sockets.emit('messages', messages);
};

module.exports = socketApi;
