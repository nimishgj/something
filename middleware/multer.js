// Import the 'multer' library for file upload handling
const multer = require('multer');

// Configure how files are stored
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination directory where uploaded files will be stored
    cb(null, './uploads/'); // In this case, files will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    // Define the filename for the uploaded file
    // It is set to a combination of the current timestamp and the original filename
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Configure the file filter to restrict allowed file types
function checkFileType(req, file, cb) {
  // Define an array of allowed MIME types for file uploads
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'application/pdf',
    'application/vnd.ms-powerpoint', // PPT
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PPTX
  ];

  // Check if the uploaded file's MIME type is included in the allowedMimeTypes array
  if (allowedMimeTypes.includes(file.mimetype)) {
    // If the MIME type is allowed, pass 'true' to the callback function
    cb(null, true);
  } else {
    // If the MIME type is not allowed, pass 'false' to the callback function
    cb(null, false);
  }
}

// Create a 'multer' instance with the defined storage, limits, and file filter
const upload = multer({
  storage: storage, // Set the storage configuration
  limits: {
    fileSize: 1024 * 1024 * 25, // Set a file size limit of 25MB (5MB limit in bytes)
  },
  fileFilter: checkFileType, // Set the file filter to check allowed MIME types
});

// Export the configured 'multer' instance to be used in other parts of the application
module.exports = upload;
