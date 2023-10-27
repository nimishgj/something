// Import the 'mongoose' library for working with MongoDB
const mongoose = require('mongoose');

// Define the document schema for the 'documents' collection in MongoDB
const documentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"], // Field is required
        trim: true, // Trim leading and trailing spaces
        maxlength: [20, "Name cannot be more than 20 characters"], // Max character limit
    },
    file: {
        type: String,
        required: [true, "Please provide a file"], // Field is required
    },
    createdAt: {
        type: Date,
        default: Date.now, // Default value is the current date and time
    },
    user: {
        type: String,
        required: [true, "Please provide a user"], // Field is required
        trim: true, // Trim leading and trailing spaces
        maxlength: [20, "User cannot be more than 20 characters"], // Max character limit
    },
    subject: {
        type: String,
        required: [true, "Please provide a subject"], // Field is required
        trim: true, // Trim leading and trailing spaces
        maxlength: [20, "Subject cannot be more than 20 characters"], // Max character limit
    },
    scheme: {
        type: String,
        required: [true, "Please provide a scheme"], // Field is required
        trim: true, // Trim leading and trailing spaces
        maxlength: [20, "Scheme cannot be more than 20 characters"], // Max character limit
    },
});

// Export the 'documents' model, defining the schema for the 'documents' collection
module.exports = mongoose.model("documents", documentSchema);
