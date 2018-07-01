const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    "name": String,
    "address": String,
    "phone": String,
    "photoUrl": String
});

const Contact = mongoose.model('contact', ContactSchema);

module.exports = Contact;