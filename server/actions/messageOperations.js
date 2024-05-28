const { Message } = require('../models/Message');

const ADD_MESSAGE = async (data) => {
    try {
        const newMessage = await new Message({
            content: data.content,
            admin: !!data.admin,
            user: data.user ? data.user._id : null,
            room: data.room._id
        }).save();

        return Message.populate(newMessage, {
            path: 'user',
            select: 'username social handle image'
        });
    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
};

const GET_MESSAGES = async (data) => {
    try {
        return Message.find({ room: data.room._id }).populate('user', [
            'username',
            'social',
            'handle',
            'image'
        ]);
    } catch (error) {
        console.error('Error getting messages:', error);
        throw error;
    }
};

module.exports = {
    ADD_MESSAGE,
    GET_MESSAGES
};
