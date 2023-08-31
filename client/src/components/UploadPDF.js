// UploadPDF.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPDF } from '../slices/pdfSlice'; // Adjust the path to your pdfSlice

function UploadPDF() {
  const dispatch = useDispatch();
  const [pdfFile, setPDFFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileChange = (e) => {
    setPDFFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    // Limit the title to a maximum of 25 characters
    if (e.target.value.length <= 25) {
      setTitle(e.target.value);
    }
  };

  const handleDescriptionChange = (e) => {
    // Limit the description to a maximum of 45 characters
    if (e.target.value.length <= 45) {
      setDescription(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('title', title);
    formData.append('description', description);

    try {
      await dispatch(uploadPDF(formData));
      // Handle successful upload here (e.g., fetch updated PDF list)
    } catch (error) {
      console.error('PDF upload error:', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Upload PDF</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Title (Max 25 characters)"
          value={title}
          onChange={handleTitleChange}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Description (Max 45 characters)"
          value={description}
          onChange={handleDescriptionChange}
          className="border rounded p-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default UploadPDF;
