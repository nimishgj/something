// Import required modules and controllers
const upload = require('../middleware/multer'); // Import the 'multer' middleware for file uploads
const express = require('express'); // Import the Express.js framework

// Import controllers for various endpoints
const { downloadLogs, getRecentLogs } = require('../controllers/logs');
const { getDocuments, addDocument, downloadDocument, getDocumentsByUploader, getDocumentsBySubject, getDocumentByScheme, trial, deleteDocument } = require('../controllers/documents');
const { createUser, loginAuth, changePassword } = require('../controllers/users');
const { createScheme, getScheme } = require('../controllers/scheme');
const { downloadErrors } = require("../controllers/error")

// Create an Express router
const router = express.Router();

// Define routes and their corresponding HTTP methods

// Routes for managing documents
router.route('/documents/:user')
  .get(getDocuments) // GET request to retrieve documents associated with a specific user
  .post(upload.single('file'), addDocument); // POST request to handle file upload and add a document

// Route for downloading a document
router.route('/download/:id/:user')
  .get(downloadDocument); // GET request to download a specific document for a given user

// Route for retrieving documents uploaded by a specific user
router.route('/documentsByUploader/:owner')
  .get(getDocumentsByUploader); // GET request to retrieve documents uploaded by a specific user

// Route for retrieving documents by subject
router.route('/documentsBySubject/:subject')
  .get(getDocumentsBySubject); // GET request to retrieve documents related to a specific subject

// Route for retrieving a document by scheme
router.route('/documentByScheme')
  .post(getDocumentByScheme); // POST request to retrieve a document based on a specific scheme

// Route for creating a new user
router.route('/createuser')
  .post(createUser); // POST request to create a new user

// Route for user authentication
router.route('/loginAuth')
  .post(loginAuth); // POST request for user authentication, likely used for login

// Route for creating a new scheme
router.route('/createSchema')
  .post(createScheme); // POST request to create a new scheme

// Route for retrieving scheme information
router.route('/getschema')
  .get(getScheme); // GET request to retrieve scheme information

// Route for deleting a document
router.route('/:id')
  .delete(deleteDocument); // DELETE request to delete a specific document identified by 'id'

// Route for downloading logs
router.route('/downloadLogs')
  .get(downloadLogs); // GET request to download logs

// Route for downloading Errors
router.route('/downloadErrors')
  .get(downloadErrors); // GET request to download Errors

// Route for retrieving recent logs
router.route('/getLogs')
  .get(getRecentLogs); // GET request to retrieve recent logs

// Route for changing a user's password
router.route('/changePassword')
  .post(changePassword); // POST request to change a user's password

// Export the router for use in the Express application
module.exports = router;
