require('dotenv').config(); // Ensure .env variables are loaded
const { mongoose, connect } = require('../db/mongoose'); // Adjust the path to your connection file
// const { User } = require('../models/User'); // Adjust the path to your User model

// connect(); // Establish database connection

const fs = require('fs');
const path = require('path');

const db = mongoose.connection;
//
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async function() {
    console.log('Connected to the database');

    try {
        const migrationCollection = db.collection('migrations');
        const appliedMigrations = await migrationCollection.find().toArray();
        const appliedMigrationNames = appliedMigrations.map(m => m.name);

        const migrationFiles = fs
            .readdirSync(__dirname)
            .filter(file => file.endsWith('.js') && file !== 'run-migrations.js');

        for (const file of migrationFiles) {
            const migrationName = path.basename(file, '.js');
            if (!appliedMigrationNames.includes(migrationName)) {
                console.log(`Applying migration: ${migrationName}`);
                await require(`./${file}`)();
                // await migrationCollection.insertOne({ name: migrationName, appliedAt: new Date() });
                console.log(`Migration ${migrationName} applied successfully`);
            } else {
                console.log(`Migration ${migrationName} has already been applied`);
            }
        }
    } catch (error) {
        console.error('Migration error:', error);
    } finally {
        await db.close(); // Close the connection
    }
});
