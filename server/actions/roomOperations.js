const mongoose = require('mongoose');
const { Room } = require('../models/Room');
const {GET_MESSAGES, ADD_MESSAGE} = require("./messageOperations");

const CREATE_MESSAGE_CONTENT = (room, socketId) => {
    const user = room.previous.users.find(user => user.socketId === socketId);

    return user && user.lookup.handle
        ? `${user.lookup.handle} has left ${room.updated.name}`
        : `Unknown User has left ${room.updated.name}`;
};

const GET_ROOMS = async () => {
    try {
        return Room.find({})
            .populate('user users.lookup', ['username', 'social', 'handle', 'image'])
            .select('-password');
    } catch (error) {
        console.error('Error getting rooms:', error);
        throw error;
    }
};

const GET_ROOM_USERS = async (data) => {
    try {
        return Room.findById(data.room._id)
            .populate('user users.lookup', ['username', 'social', 'handle', 'image'])
            .select('-password');
    } catch (error) {
        console.error('Error getting room users:', error);
        throw error;
    }
};

const UPDATE_ROOM_USERS = async (data) => {
    try {
        const room = await Room.findOne({ name: data.room.name })
            .select('-password')
            .populate('users.lookup', ['username', 'social', 'handle', 'image']);

        if (room) {
            const userExists = room.users.some(user => user.lookup._id.toString() === data.user._id);

            if (!userExists) {
                room.users.push({
                    lookup: new mongoose.Types.ObjectId(data.user._id),
                    socketId: data.socketId
                });
            } else {
                const existingUser = room.users.find(user => user.lookup._id.toString() === data.user._id);
                if (existingUser.socketId !== data.socketId) {
                    existingUser.socketId = data.socketId;
                }
            }

            const updatedRoom = await room.save();
            return await Room.populate(updatedRoom, {
                path: 'user users.lookup',
                select: 'username social image handle'
            });
        }
    } catch (error) {
        console.error('Error updating room users:', error);
        throw error;
    }
};

const FILTER_ROOM_USERS = async (data) => {
    try {
        const room = await Room.findById(new mongoose.Types.ObjectId(data.roomId))
            .select('-password')
            .populate('users.lookup', ['username', 'social', 'handle', 'image']);

        if (room) {
            let previousUserState = { ...room._doc };
            room.users = room.users.filter(user => user.socketId !== data.socketId);
            const updatedRoom = await room.save();
            return {
                previous: previousUserState,
                updated: await Room.populate(updatedRoom, {
                    path: 'user users.lookup',
                    select: 'username social image handle'
                })
            };
        }
    } catch (error) {
        console.error('Error filtering room users:', error);
        throw error;
    }
};

const JOIN_ROOM = async (socket, data) => {
    try {
        socket.join(data.room._id);

        const messages = await GET_MESSAGES(data);
        const room = await UPDATE_ROOM_USERS(data);

        socket.emit('updateRoomData', JSON.stringify({ messages, room }));

        const userList = await GET_ROOM_USERS(data);
        socket.broadcast.to(data.room._id).emit('updateUserList', JSON.stringify(userList));

        const rooms = await GET_ROOMS();
        socket.broadcast.emit('updateRooms', JSON.stringify({ room: rooms }));

        const newMessage = await ADD_MESSAGE({
            room: data.room,
            user: false,
            content: data.content,
            admin: data.admin
        });
        socket.broadcast.to(data.room._id).emit('receivedNewMessage', JSON.stringify(newMessage));
    } catch (error) {
        console.error('Error joining room:', error);
        throw error;
    }
};

module.exports = {
    CREATE_MESSAGE_CONTENT,
    GET_ROOMS,
    GET_ROOM_USERS,
    UPDATE_ROOM_USERS,
    FILTER_ROOM_USERS,
    JOIN_ROOM
};
