// Import necessary models and libraries
const User = require("../models/Users"); // Import the 'User' model for user data
const Logs = require('../models/Logs'); // Import the 'Logs' model for logging
const Document = require("../models/documents"); // Import the 'documents' model for documents
const Errors = require("../models/Errors"); // Import the 'Errors' model for error handling

// Function to create a new user
const createUser = async (req, res) => {
    try {
        // Extract user data from the request body
        const { name, email, password, username, role } = req.body;

        // Create a new user using the extracted data
        const user = await User.create({ name, email, password, username, role });

        // Return the created user as a JSON response
        res.status(200).json(user);
    } catch (error) {
        // Log any errors that occur and send an error response
        await Errors.create({ filename: "controllers-users.js-createUser", Error: error.toString() });
        res.status(500).send({ msg: "SERVER ERROR: User creation failed", errorMessage: error });
    }
};

// Function to authenticate a user during login
const loginAuth = async (req, res) => {
    try {
        // Find a user with the provided username and password
        const result = await User.findOne({ username: req.body.username, password: req.body.password });

        // If a user is found with the given username and password
        if (result) {
            const log = `${req.body.username} logged in at ${new Date()}`;

            // Log the login action
            await Logs.create({ log });

            // Find documents related to the logged-in user
            const documents = await Document.find({ user: result.name });

            // Return user data and related documents as a JSON response
            res.status(200).json({
                userdata: result,
                documents: documents,
            });
        } else {
            res.status(201).json({message:"Invalid login details"})
        }
    } catch (error) {
        // Log any errors that occur and send an error response
        await Errors.create({ filename: "controllers-users.js-loginAuth", Error: error.toString() });
        res.status(500).send({ msg: "SERVER ERROR: User Authentication failed", errorMessage: error });
    }
};

// Function to change a user's password
const changePassword = async (req, res) => {
    const { username, currentPassword, newPassword } = req.body;
    try {
        // Find the user by their username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the current password matches the one stored in the database
        if (user.password !== currentPassword) {
            return res.status(201).json({ message: 'Current password is incorrect' });
        }

        // Update the user's password with the new password
        user.password = newPassword;
        await user.save();

        // Return a success message
        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        // Log any errors that occur and send an error response
        await Errors.create({ filename: "controllers-users.js-changePassword", Error: error.toString() });
        res.status(500).send({ msg: "SERVER ERROR: New Password could not be updated in the Database", errorMessage: error });
    }
};

// Export the functions for use in other parts of the application
module.exports = {
    createUser,
    loginAuth,
    changePassword
};
