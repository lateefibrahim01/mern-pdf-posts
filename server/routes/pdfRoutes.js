// pdfRoutes.js

const express = require('express');
const router = express.Router();
const pdfController = require('../controllers/pdfController');
const authenticateJWT = require('../middlewares/authMiddleware');
const multer = require('multer');

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory where PDFs will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Customize the file naming as needed
  },
});

const upload = multer({ storage });

// Route to upload a PDF file with title and description (protected)
router.post('/upload-pdf', authenticateJWT, upload.single('pdf'), pdfController.uploadPDF);

// Route to download a PDF file by its ID (protected)
router.get('/download-pdf/:id', authenticateJWT, pdfController.downloadPDF);

// Route to get all uploaded PDFs with titles and descriptions (protected)
router.get('/get-all-pdfs', authenticateJWT, pdfController.getAllPDFs);

// Route to like a PDF file by its ID (protected)
router.post('/like-pdf/:id', authenticateJWT, pdfController.likePDF);

module.exports = router;
