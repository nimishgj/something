// Import the 'mongoose' library for working with MongoDB
const mongoose = require('mongoose');

// Define the user schema for the 'Schema' collection in MongoDB
const userSchema = new mongoose.Schema({
    schema: {
        type: String,
        required: true, // 'schema' field is required
    },
    subjects: [{
        type: String,
        required: true, // Each subject in the 'subjects' array is required
    }]
});

// Export the 'Schema' model, defining the schema for the 'Schema' collection
module.exports = mongoose.model("Schema", userSchema);
