// authRoutes.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Google OAuth2Client login route
router.post('/google-login', userController.googleLogin);

module.exports = router;
