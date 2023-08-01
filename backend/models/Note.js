// Model of mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose; // For the use of schema

const NotesSchema = new Schema ({
    user:{
        type: mongoose.Schema.Types.ObjectId, // Foreign Key
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// for use of schema           
// Create model
module.exports = mongoose.model('notes', NotesSchema);