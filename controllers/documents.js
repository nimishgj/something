// Import required modules and models
const docs = require('../models/documents'); // Import the 'documents' model
const path = require('path');
const Logs = require('../models/Logs');
const errors = require('../models/Errors');


// Function to get all documents
const getDocuments = async (req, res) => {
    try {
        // Retrieve all documents from the database
        const items = await docs.find({});
        
        // Log the access to documents by the user and timestamp
        const log = `${req.params.user} accessed all the documents at ${new Date()}`;
        await Logs.create({ log });

        // Respond with the retrieved documents
        res.status(200).json({ items });
    } catch (error) {
        // Log and handle errors if they occur
        await errors.create({ filename: 'controllers-documents.js-getDocuments', Error:"getDocumentsError" });
        res.status(500).json({ message: 'SERVER ERROR: Documents could not be retrieved from the Database', errorObject: error });
    }
}

// Function to add a new document
const addDocument = async (req, res) => {
    try {
        // Extract data from the request body
        const { name } = req.body;
        const file = req.file.path;
        const { user, subject, scheme } = req.body;

        // Create a new document entry in the database
        const doc = await docs.create({ name, file, user, subject, scheme });

        // Log the upload of the document and timestamp
        const log = `${req.body.user} Uploaded ${name} at ${new Date()}`;
        await Logs.create({ log });

        // Respond with the created document
        res.status(200).json({ message:"Document successfully uploaded to Database" });
    } catch (error) {
        // Log and handle errors if they occur
        await errors.create({ filename: 'controllers-documents.js-addDocument', Error: "getDocumentsError" });
        res.status(201).json({ message: 'SERVER ERROR: Document could not be uploaded to the Database', errorObject: error });
    }
};

// Function to download a document
const downloadDocument = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the document by its ID in the database
        const doc = await docs.findById(id);

        // If the document doesn't exist, throw an error
        if (!doc) {
            throw new Error('Document does not exist');
        }

        // Get the file path and construct the full file path
        const file = doc.file;
        const filePath = path.join(__dirname, `../${file}`);

        // Log the download of the document and timestamp
        const log = `${req.params.user} downloaded ${doc.name} at ${new Date()}`;
        await Logs.create({ log });

        // Send the file for download
        res.download(filePath);
    } catch (error) {
        // Log and handle errors if they occur
        await errors.create({ filename: 'controllers-documents.js-downloadDocument', Error: "getDocumentsError" });
        res.status(500).json({ message: 'SERVER ERROR: Document could not be retrieved from the Database', errorObject: error });
    }
}

// Function to get documents uploaded by a specific user
const getDocumentsByUploader = async (req, res) => {
    try {
        // Find documents with the specified user as the uploader
        const result = await docs.find({ user: `${req.params.owner}` });

        // Respond with the retrieved documents
        res.status(200).json(result);
    } catch (error) {
        // Log and handle errors if they occur
        await errors.create({ filename: 'controllers-documents.js-getDocumentsByUploader', Error: "getDocumentsError" });
        res.status(500).json({ message: 'SERVER ERROR: Could not retrieve Documents by uploader', errorObject: error });
    }
}

// Function to get documents related to a specific subject
const getDocumentsBySubject = async (req, res) => {
    try {
        // Find documents related to the specified subject
        const result = await docs.find({ subject: `${req.params.subject}` });

        // Respond with the retrieved documents
        res.status(200).json(result);
    } catch (error) {
        // Log and handle errors if they occur
        await errors.create({ filename: 'controllers-documents.js-getDocumentsBySubject', Error: "getDocumentsError" });
        res.status(500).json({ message: 'SERVER ERROR: Could not retrieve Documents by Subject', errorObject: error });
    }
}

// Function to get documents based on a specific scheme
const getDocumentByScheme = async (req, res) => {
    try {
        // Find documents related to the specified scheme
        const result = await docs.find({ scheme: `${req.body.scheme}` });

        // Respond with the retrieved documents
        res.status(200).json(result);
    } catch (error) {
        // Log and handle errors if they occur
        await errors.create({ filename: 'controllers-documents.js-getDocumentByScheme', Error: "getDocumentsError" });
        res.status(500).json({ message: 'SERVER ERROR: Could not retrieve Documents by Scheme' });
    }
}

// Function to delete a document
const deleteDocument = async (req, res) => {
    try {
        
        const { id } = req.params;

        // Find the document by its ID in the database
        const doc = await docs.findById(id);

        // If the document doesn't exist, throw an error
        if (!doc) {
            throw new Error('Document does not exist');
        }

        // Get the file path and construct the full file path
        const file = doc.file;
        const filePath = path.join(__dirname, `../${file}`);

        // Delete the document from the database
        await docs.findByIdAndDelete(id);

        // Log the deletion of the document and timestamp
        const log = `${req.params.user} deleted file ${doc.name} at ${new Date()}`;
        await Logs.create({ log });

        // Respond with a success message
        res.status(200).json({ message: 'File deleted' });
    } catch (error) {
        // Log and handle errors if they occur
        await errors.create({ filename: 'controllers-documents.js-deleteDocument', Error: "getDocumentsError" });
        res.status(500).json({ message: 'SERVER ERROR: Document could not be deleted from the Database' });
    }
}


// Export the functions for use in other parts of the application
module.exports = {
    getDocuments,
    addDocument,
    downloadDocument,
    getDocumentsByUploader,
    getDocumentsBySubject,
    getDocumentByScheme,
    deleteDocument
};