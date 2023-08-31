const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const bodyParser = require('body-parser');
const path = require('path');

// Initialize Express app
const app = express();

// Connect to MongoDB (adjust the connection URL as needed)
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


// Body parsing middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const authRoutes = require('./routes/authRoutes');
const pdfRoutes = require('./routes/pdfRoutes');

// Use the defined routes
app.use('/auth', authRoutes);
app.use('/pdf', pdfRoutes);

// Handle errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start the Express server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
