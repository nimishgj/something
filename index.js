// Import the 'express' library to create the application
const express = require('express');
const app = express();

// Load environment variables from a .env file
const dotenv = require('dotenv').config();

// Import the 'connectDB' function to establish a database connection
const connectDB = require('./db/connect');

// Import the 'Errors' model for error handling
const Error = require('./models/Errors');

// Import the 'cors' middleware to handle cross-origin requests
const cors = require('cors');

// Define the port for the server, using environment variables or default to 3000
const port = process.env.PORT || 5000;

// Enable CORS for the Express application
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Parse incoming URL-encoded data with querystring library
app.use(express.urlencoded({ extended: false }));

// Define a root route for the API
app.get('/', (req, res) => {
    res.send('Server is Up and Running. Read the Documentation to know more about the API request process');
});

// Import the routes from 'routes.js' and mount them under the '/api' path
const itemsRouter = require('./routes/routes');
app.use('/api', itemsRouter);

// Function to start the server and connect to the database
const start = async () => {
    try {
        console.log('Connecting to the Database');
        console.log('....');

        // Use the 'connectDB' function to establish a connection to the MongoDB database
        await connectDB(process.env.MONGO_URI);

        console.log('Connected to the Database');

        // Start the Express server and listen on the defined port
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        });
    } catch (error) {
        // Log any errors that occur and create an error entry
        const message = `New error created from index.js at ${new Date()}. Error object: ${error}`;
        await Error.create({ message });
        console.log(error);
    }
}

// Call the 'start' function to start the server
start();
