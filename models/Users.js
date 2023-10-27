// Import the 'mongoose' library for working with MongoDB
const mongoose = require('mongoose');

// Define the user schema for the 'Users' collection in MongoDB
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"], // Field is required
        trim: false, // Do not trim leading and trailing spaces
        maxlength: [100, "Name cannot be more than 100 characters"], // Max character limit
    },
    username: {
        type: String,
        required: [true, "Please provide a username"], // Field is required
        trim: false, // Do not trim leading and trailing spaces
        maxlength: [100, "Username cannot be more than 100 characters"], // Max character limit
    },
    password: {
        type: String,
        required: [true, "Please provide a password"], // Field is required
        trim: false, // Do not trim leading and trailing spaces
        maxlength: [100, "Password cannot be more than 100 characters"], // Max character limit
    },
    email: {
        type: String,
        required: [true, "Please provide an email"], // Field is required
        trim: false, // Do not trim leading and trailing spaces
        maxlength: [100, "Email cannot be more than 100 characters"], // Max character limit
    },
    role: {
        type: String,
        required: [true, "Please provide a role"], // Field is required
        trim: false, // Do not trim leading and trailing spaces
        maxlength: [100, "Role cannot be more than 100 characters"], // Max character limit
    }
});

// Export the 'Users' model, defining the schema for the 'Users' collection
module.exports = mongoose.model("Users", userSchema);
