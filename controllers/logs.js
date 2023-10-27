// Import necessary models and libraries
const Logs = require("../models/Logs"); // Import the 'Logs' model for log data
const errors = require("../models/Errors"); // Import the 'Errors' model for error handling
const createCsvWriter = require("csv-writer").createObjectCsvWriter; // Import a library for creating CSV files

// Function to download logs from the database
const downloadLogs = async (req, res) => {
  try {
    // Get all logs from the database
    const logs = await Logs.find({});
    
    // Check if there are any logs in the database
    if (logs.length === 0) {
      // If no logs are found, send a 404 response with an error message
      return res.status(404).send({ msg: "No logs found." });
    }

    // Create a CSV writer with the destination file path and CSV header
    const csvWriter = createCsvWriter({
      path: "logs.csv", // Define the file path where the CSV will be saved
      header: [
        { id: "log", title: "Log" }, // Define the CSV header with a single column "Log"
      ],
    });

    // Map the log data to match the CSV header
    const records = logs.map((log) => {
      return {
        log: log.log, // Map the "log" field from the log data to the "log" column in the CSV
      };
    });

    // Write the records to the CSV file
    csvWriter
      .writeRecords(records) 
      .then(() => {
        // Provide the CSV file for download as a response
        res.download("logs.csv");
      });
  } catch (error) {
    // Log any errors that occur and send an error response
    await errors.create({ filename: "controllers-logs.js-DownloadLogs", Error: error.toString() });
    res.status(500).send({ msg: "SERVER ERROR: Logs could not be retrieved from the database", errorMessage: error });
  }
};

// Function to get the last 10 logs from the database
const getRecentLogs = async (req, res) => {
  try {
    // Get the last 10 logs from the database by sorting by _id and limiting the result
    const logs = await Logs.find({}).sort({ _id: -1 }).limit(10);

    // Send the last 10 logs as the response data
    res.status(200).json(logs);
  } catch (error) {
    // Log any errors that occur and send an error response
    await errors.create({ filename: "controllers-logs.js-DownloadLogs", Error: error.toString() });
    res.status(202).send({ msg: "SERVER ERROR: Logs could not be retrieved from the database", errorMessage: error });
  }
};

// Export the functions for use in other parts of the application
module.exports = { 
  downloadLogs, 
  getRecentLogs 
};
