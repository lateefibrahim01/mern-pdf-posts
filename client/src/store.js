// store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Adjust the path to your authSlice
import pdfReducer from './pdfSlice'; // Adjust the path to your pdfSlice

const store = configureStore({
  reducer: {
    auth: authReducer,
    pdfs: pdfReducer,
    // You can add more reducers here if needed
  },
});

export default store;
