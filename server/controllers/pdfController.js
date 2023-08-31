// pdfController.js

const PDF = require('../models/PDF');
const fs = require('fs');
const path = require('path');

// Directory where PDFs will be stored
const UPLOADS_DIR = path.join(__dirname, '../uploads/');

// Upload a PDF file with title and description
async function uploadPDF(req, res) {
  const { title, description } = req.body;
  const { filename } = req.file;

  try {
    const newPDF = new PDF({
      title,
      description,
      fileUrl: `/uploads/${filename}`, // Store the relative URL to access the file
      uploadedBy: req.user._id, // Assuming you've set up user authentication properly
    });

    await newPDF.save();
    res.status(201).json({ message: 'PDF uploaded successfully.', pdf: newPDF });
  } catch (error) {
    console.error('PDF upload error:', error);
    res.status(500).json({ message: 'PDF upload failed.' });
  }
}

// Download a PDF file by its ID
async function downloadPDF(req, res) {
  const pdfId = req.params.id;

  try {
    const pdf = await PDF.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found.' });
    }

    const filePath = path.join(UPLOADS_DIR, path.basename(pdf.fileUrl));

    // Serve the file as an attachment
    res.download(filePath, `${pdf.title}.pdf`, (err) => {
      if (err) {
        console.error('PDF download error:', err);
        res.status(500).json({ message: 'PDF download failed.' });
      }
    });
  } catch (error) {
    console.error('PDF download error:', error);
    res.status(500).json({ message: 'PDF download failed.' });
  }
}

// Get all uploaded PDFs with titles and descriptions
async function getAllPDFs(req, res) {
  try {
    const pdfs = await PDF.find();
    res.status(200).json({ pdfs });
  } catch (error) {
    console.error('Get all PDFs error:', error);
    res.status(500).json({ message: 'Failed to retrieve PDFs.' });
  }
}

// Like a PDF file by its ID
async function likePDF(req, res) {
  const pdfId = req.params.id;

  try {
    const pdf = await PDF.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ message: 'PDF not found.' });
    }

    // Assuming you have user authentication in place and store user ID in req.user._id
    if (!pdf.likes.includes(req.user._id)) {
      pdf.likes.push(req.user._id);
      await pdf.save();
    }

    res.status(200).json({ message: 'PDF liked successfully.' });
  } catch (error) {
    console.error('Like PDF error:', error);
    res.status(500).json({ message: 'Failed to like PDF.' });
  }
}

module.exports = {
  uploadPDF,
  downloadPDF,
  getAllPDFs,
  likePDF,
};
