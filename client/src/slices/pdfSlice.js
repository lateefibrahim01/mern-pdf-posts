// pdfSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // You may need to install Axios if not already done

// Define an initial state for PDF-related data
const initialState = {
  pdfs: [], // Store PDF data
  isLoading: false, // To track loading state for API requests
  error: null, // To store any API errors
};

// Define an async thunk to fetch all PDFs from the backend
export const fetchAllPDFs = createAsyncThunk('pdfs/fetchAllPDFs', async () => {
  try {
    const response = await axios.get('/pdf/get-all-pdfs'); // Adjust the API endpoint as needed
    return response.data.pdfs; // Assuming the API returns an array of PDFs
  } catch (error) {
    throw error.response.data.message;
  }
});

// Define an async thunk to upload a PDF to the backend
export const uploadPDF = createAsyncThunk('pdfs/uploadPDF', async (pdfData) => {
  try {
    const response = await axios.post('/pdf/upload-pdf', pdfData); // Adjust the API endpoint as needed
    return response.data.pdf;
  } catch (error) {
    throw error.response.data.message;
  }
});

// Define an async thunk to download a PDF from the backend
export const downloadPDF = createAsyncThunk('pdfs/downloadPDF', async (pdfId) => {
  try {
    const response = await axios.get(`/pdf/download-pdf/${pdfId}`); // Adjust the API endpoint as needed
    return response.data; // You can handle the downloaded file in the component
  } catch (error) {
    throw error.response.data.message;
  }
});

// Define an async thunk to like a PDF on the backend
export const likePDF = createAsyncThunk('pdfs/likePDF', async (pdfId) => {
  try {
    await axios.post(`/pdf/like-pdf/${pdfId}`); // Adjust the API endpoint as needed
  } catch (error) {
    throw error.response.data.message;
  }
});

// Create a PDFs slice
const pdfsSlice = createSlice({
  name: 'pdfs',
  initialState,
  reducers: {
    // Define additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPDFs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllPDFs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pdfs = action.payload;
        state.error = null;
      })
      .addCase(fetchAllPDFs.rejected, (state, action) => {
        state.isLoading = false;
        state.pdfs = [];
        state.error = action.payload;
      })
      .addCase(uploadPDF.fulfilled, (state, action) => {
        state.pdfs.push(action.payload);
        state.error = null;
      })
      .addCase(downloadPDF.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(likePDF.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Export actions and reducer
export const { /* define additional actions here if needed */ } = pdfsSlice.actions;
export default pdfsSlice.reducer;
