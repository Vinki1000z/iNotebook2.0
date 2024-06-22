const mongoose = require('mongoose');


const AuthSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        // minlength: 6 // Ensure the password is at least 6 characters long
    },
    email: {
        type: String,
        // required: true, 
        trim: true, // Trim leading and trailing spaces
        lowercase: true, // Convert email to lowercase before saving
    }
});

module.exports =  mongoose.model('authNotes', AuthSchema);