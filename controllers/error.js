// Import the 'Errors' model to access error log data from the database
const Errors = require('../models/Errors');
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

// Function to download error logs
const downloadErrors = async (req, res) => {
    try {
        // Retrieve all error logs from the database
        const errors = await Errors.find({});

        // Check if there are any error logs in the database
        if (errors.length === 0) {
            // If there are no error logs, send a 404 response with an error message
            return res.status(404).send({ msg: "No Errors found." });
        }

        // Create a CSV writer with the destination file path and CSV header
        const csvWriter = createCsvWriter({
            path: "errors.csv", // Define the file path where the CSV will be saved
            header: [
                { id: "error", title: "Error" }, // Define the CSV header with a single column "Error"
            ],
        });

        // Map the error logs data to match the CSV header
        const records = errors.map((error) => {
            return {
                error: error.Error, // Map the "error" field from the error log to the "error" column in the CSV
            };
        });

        // Write the records to the CSV file
        await csvWriter.writeRecords(records);

        // Provide the CSV file for download as a response
        res.download("errors.csv");
    } catch (error) {
        // Handle any errors that occur during the process and send an error response
        res.status(500).send({ message: "Errors couldn't be retrieved from the database", errorMessage: error });
    }
};

// Export the functions
module.exports = { 
  downloadErrors
};
