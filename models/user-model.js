const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String
    },
    admin: {
        type: Boolean
    },
    password: {
        type: String
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;