// Import the 'mongoose' library for working with MongoDB
const mongoose = require('mongoose');

// Define the log schema for the 'Logs' collection in MongoDB
const logSchema = new mongoose.Schema({
    log: {
        type: String,
        required: [true, "Please provide a log"], // Field is required
    },
});

// Export the 'Logs' model, defining the schema for the 'Logs' collection
module.exports = mongoose.model("Logs", logSchema);
