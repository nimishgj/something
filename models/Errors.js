// Import the 'mongoose' library for working with MongoDB
const mongoose = require('mongoose');

// Define the error schema for the 'Errors' collection in MongoDB
const errorSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: [true, "Please provide a filename"], // Field is required
    },
    Error: {
        type: String,
        required: [true, "Please provide an error log"], // Field is required
    },
});

// Export the 'Errors' model, defining the schema for the 'Errors' collection
module.exports = mongoose.model("Errors", errorSchema);
