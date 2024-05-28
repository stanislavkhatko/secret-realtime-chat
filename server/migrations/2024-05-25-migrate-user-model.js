const { User } = require('../models/User');

const generateUniqueHandle = async () => {
    const timestamp = new Date().getTime();
    const randomNum = Math.floor(Math.random() * 1000);
    return `user_${timestamp}_${randomNum}`;
};

const migrate = async () => {
    try {
        const users = await User.find({ handle: { $exists: false } });

        for (const user of users) {
            user.handle = await generateUniqueHandle();
            await user.save();
        }

        console.log('Migration successful: All users have valid handles.');
    } catch (error) {
        console.error('Error during migration:', error);
    }
};

module.exports = migrate;
