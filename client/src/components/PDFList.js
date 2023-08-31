// PDFList.js

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPDFs, downloadPDF, likePDF } from '../slices/pdfSlice'; // Adjust the path to your pdfSlice

function PDFList() {
  const dispatch = useDispatch();
  const pdfs = useSelector((state) => state.pdfs.pdfs);
  const isLoading = useSelector((state) => state.pdfs.isLoading);

  const handleDownload = async (pdfId) => {
    try {
      const response = await dispatch(downloadPDF(pdfId));
      // Handle downloaded file (e.g., open in new tab or window)
    } catch (error) {
      console.error('PDF download error:', error);
    }
  };

  const handleLike = async (pdfId) => {
    try {
      await dispatch(likePDF(pdfId));
      // Handle successful like (e.g., fetch updated PDF list)
    } catch (error) {
      console.error('PDF like error:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">PDF List</h2>
      {isLoading ? (
        <p>Loading PDFs...</p>
      ) : (
        <ul className="space-y-4">
          {pdfs.map((pdf) => (
            <li key={pdf._id} className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{pdf.title}</p>
                <p className="text-gray-600">{pdf.description}</p>
              </div>
              <div className="space-x-4">
                <button
                  onClick={() => handleDownload(pdf._id)}
                  className="text-blue-500 hover:underline"
                >
                  Download
                </button>
                <button
                  onClick={() => handleLike(pdf._id)}
                  className="text-red-500 hover:underline"
                >
                  Like
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PDFList;
