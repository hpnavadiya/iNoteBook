// Model of mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose; // For the use of schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// for use of schema           
// Create model
const User = mongoose.model('user', UserSchema);
// User.createIndexes(); // For create user indexes
module.exports = User;