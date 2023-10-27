// Import the 'mongoose' library for working with MongoDB
const mongoose = require('mongoose');

// Disable the 'strictQuery' mode for mongoose (allows undefined fields)
mongoose.set("strictQuery", false);


// Function to connect to a MongoDB database using the provided URL
const connectDB = (url) => {
    // Return a promise that connects to the database using the provided URL
    return mongoose.connect(url, {});
};

// Export the 'connectDB' function to be used to connect to the database in other parts of the application
module.exports = connectDB;
