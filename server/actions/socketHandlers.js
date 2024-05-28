// socketHandlers.js
const mongoose = require('mongoose');
const { ADD_MESSAGE } = require('./../actions/messageOperations');
const {
    CREATE_MESSAGE_CONTENT,
    GET_ROOMS,
    GET_ROOM_USERS,
    UPDATE_ROOM_USERS,
    FILTER_ROOM_USERS,
    JOIN_ROOM
} = require('./../actions/roomOperations');
const {logger} = require('./../config/logModule');

let userTypings = {};
let io;

const initialize = (socketIo) => {
    io = socketIo;
};

const handleDisconnect = async (socket, currentRoomId) => {
    logger.info('User Disconnected');

    if (currentRoomId) {
        const roomState = await FILTER_ROOM_USERS({
            roomId: currentRoomId,
            socketId: socket.id
        });

        socket.broadcast.to(currentRoomId).emit(
            'updateUserList',
            JSON.stringify(await GET_ROOM_USERS({ room: { _id: new mongoose.Types.ObjectId(currentRoomId) }}))
        );

        socket.broadcast.emit(
            'updateRooms',
            JSON.stringify({ room: await GET_ROOMS() })
        );

        socket.broadcast.to(currentRoomId).emit(
            'receivedNewMessage',
            JSON.stringify(await ADD_MESSAGE({
                room: { _id: roomState.previous._id },
                user: null,
                content: CREATE_MESSAGE_CONTENT(roomState, socket.id),
                admin: true
            }))
        );
    }
};

const handleUserJoined = (socket, data) => {
    currentRoomId = data.room._id;
    data.socketId = socket.id;
    JOIN_ROOM(socket, data);
};

const handleExitRoom = async (socket, data) => {
    currentRoomId = null;
    socket.leave(data.room._id);

    socket.to(data.room._id).emit('updateRoomData', JSON.stringify({ room: data.room }));
    socket.broadcast.emit('updateRooms', JSON.stringify({ room: await GET_ROOMS() }));
    io.to(data.room._id).emit('receivedUserExit', data.room);
    socket.broadcast.to(data.room._id).emit('receivedNewMessage', JSON.stringify(await ADD_MESSAGE(data)));
};

const handleUserTyping = (socket, data) => {
    if (!userTypings[data.room._id]) {
        userTypings[data.room._id] = [];
    } else {
        if (!userTypings[data.room._id].includes(data.user.handle)) {
            userTypings[data.room._id].push(data.user.handle);
        }
    }

    socket.broadcast.to(data.room._id).emit('receivedUserTyping', JSON.stringify(userTypings[data.room._id]));
};

const handleRemoveUserTyping = (socket, data) => {
    if (userTypings[data.room._id]) {
        if (userTypings[data.room._id].includes(data.user.handle)) {
            userTypings[data.room._id] = userTypings[data.room._id].filter(handle => handle !== data.user.handle);
        }
    }

    socket.broadcast.to(data.room._id).emit('receivedUserTyping', JSON.stringify(userTypings[data.room._id]));
};

const handleNewMessage = async (socket, data) => {
    const newMessage = await ADD_MESSAGE(data);
    io.to(data.room._id).emit('receivedNewMessage', JSON.stringify(newMessage));
};

const handleRoomDeleted = (socket, data) => {
    io.to(data.room._id).emit('receivedNewMessage', JSON.stringify(data));
    io.to(data.room._id).emit('roomDeleted', JSON.stringify(data));
    io.emit('roomListUpdated', JSON.stringify(data));
};

const handleRoomAdded = (socket, data) => {
    io.emit('roomAdded', JSON.stringify(data));
};

const handleRoomUpdateEvent = (socket, data) => {
    io.in(data.room._id).emit('roomUpdated', JSON.stringify(data));
    io.emit('roomNameUpdated', JSON.stringify(data));
};

const handleReconnectUser = async (socket, data) => {
    currentRoomId = data.room._id;
    data.socketId = socket.id;

    if (socket.request.headers.referer.split('/').includes('room')) {
        socket.join(currentRoomId);
        socket.emit('reconnected');
        await UPDATE_ROOM_USERS(data);
    }
};

module.exports = {
    handleDisconnect,
    handleUserJoined,
    handleExitRoom,
    handleUserTyping,
    handleRemoveUserTyping,
    handleNewMessage,
    handleRoomDeleted,
    handleRoomAdded,
    handleRoomUpdateEvent,
    handleReconnectUser,
    initialize
};
