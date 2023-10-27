// Import necessary models and libraries
const Scheme = require("../models/scheme"); // Import the 'scheme' model for scheme data
const Errors = require("../models/Errors"); // Import the 'Errors' model for error handling

// Function to create a scheme
const createScheme = async (req, res) => {
    try {
        // Get the required fields from the request body
        const { schema, subjects } = req.body;

        // Check if the scheme with the same name already exists
        let existingSchema = await Scheme.findOne({ schema });

        // If the scheme already exists, return a conflict response
        if (existingSchema) {
            return res.status(409).send({ msg: "Scheme already exists." });
        }

        // Create a new scheme with the specified schema and subjects
        const sc = await Scheme.create({ schema, subjects });

        // Return a success response with the created scheme
        res.status(200).json(sc);
    } catch (error) {
        // Log any errors that occur and send an error response
        await Errors.create({ filename: "controllers-Scheme.js-createScheme", Error: error.toString() });
        res.status(500).send({ msg: "Schemes could not be created in the database", errorMessage: error });
    }
}

// Function to retrieve all schemes
const getScheme = async (req, res) => {
    try {
        // Retrieve all schemes from the database
        const result = await Scheme.find({});

        // Return the retrieved schemes as a JSON response
        res.status(200).json(result);
    } catch (error) {
        // Log any errors that occur and send an error response
        await Errors.create({ filename: "controllers-Scheme-getScheme", Error: error.toString() });
        res.status(500).send({ msg: "SERVER ERROR: Schemes could not be retrieved from the database", errorMessage: error });
    }
}

// Export the functions for use in other parts of the application
module.exports = {
    createScheme,
    getScheme
}
