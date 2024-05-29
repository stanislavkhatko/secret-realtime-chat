/** Dotenv Environment Variables */
require('dotenv').config();

/** Connect to MongoDB */
const mongoose = require('mongoose');
require('./db/mongoose');

/** Built-In Node Dependencies */
const path = require('path');
const fs = require('fs');

/** Logging Dependencies */
const morgan = require('morgan');
const winston = require('winston');
const { logger } = require('./config/logModule');

/** Passport Configuration */
const passport = require('passport');
require('./config/passport')(passport);

/** Express */
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cors = require('cors');
const helmet = require('helmet');
const enforce = require('express-sslify');
const compression = require('compression');

/** Socket IO */
const app = express();
const index = require('http').Server(app);
const { Server } = require('socket.io');

const io = new Server(index, {
    cors: {
        origin: '*'
    }
});

/** Middleware Setup */
app.use(
    morgan('combined', {
        stream: fs.createWriteStream('logs/access.log', { flags: 'a' })
    })
);
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(expressValidator());
app.use(cors());
app.set('io', io);

/** Route Definitions */
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const roomRoutes = require('./routes/room');
const messageRoutes = require('./routes/messages');

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/room', roomRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

/** Socket Handlers */
const socketHandlers = require('./actions/socketHandlers');
socketHandlers.initialize(io); // Pass the io instance to initialize the handlers

io.on('connection', socket => {
    let currentRoomId = null;

    socket.on('disconnect', () => socketHandlers.handleDisconnect(socket, currentRoomId));
    socket.on('userJoined', data => socketHandlers.handleUserJoined(socket, data));
    socket.on('exitRoom', data => socketHandlers.handleExitRoom(socket, data));
    socket.on('userTyping', data => socketHandlers.handleUserTyping(socket, data));
    socket.on('removeUserTyping', data => socketHandlers.handleRemoveUserTyping(socket, data));
    socket.on('newMessage', data => socketHandlers.handleNewMessage(socket, data));
    socket.on('roomDeleted', data => socketHandlers.handleRoomDeleted(socket, data));
    socket.on('roomAdded', data => socketHandlers.handleRoomAdded(socket, data));
    socket.on('roomUpdateEvent', data => socketHandlers.handleRoomUpdateEvent(socket, data));
    socket.on('reconnectUser', data => socketHandlers.handleReconnectUser(socket, data));
});

console.log(process.env.NODE_ENV);
/** Serve static assets if in production */
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../client', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
}

/** Start the server if not in test environment */
if (process.env.NODE_ENV !== 'test') {
    index.listen(process.env.SERVER_PORT || 5000, () => {
        logger.info(`[LOG=SERVER] Server started on port ${process.env.SERVER_PORT}`);
    });
}

module.exports = { app };
