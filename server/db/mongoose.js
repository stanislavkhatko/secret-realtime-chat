const mongoose = require('mongoose');
const { logger } = require('../config/logModule');

mongoose.Promise = global.Promise;

const connect = () => {
    mongoose.connect(process.env.DATABASE_URL);

    // Listen for connection errors
    mongoose.connection.on('error', (error) => {
        logger.error(`MongoDB connection error: ${error}`);
    });

    // Listen for successful connection
    mongoose.connection.once('connected', () => {
        logger.info('Connected to MongoDB');
    });
};

connect();

module.exports = { mongoose, connect };
