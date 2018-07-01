const users = require('./users');
const contacts = require('./contacts');
const User = require('../models/user-model');
const Contact = require('../models/contact-model');
const mongoose = require('mongoose');

require('dotenv').config();

function seedCollection(collectionName, initialRecords) {
    mongoose.connect(process.env.DB_CONN);
    console.log("Connected to db successfully");

    collectionName.remove();

    collectionName.create(initialRecords)
        .then(() => {
            console.log("Records added successfully");
            console.log("Closing connection");
            mongoose.disconnect();
        })
        .catch(err => {
            console.log("Failed: " + err);
            console.log("Closing connection");
            mongoose.disconnect();
        });
}

seedCollection(Contact, contacts);
seedCollection(User, users);