// userController.js

const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Replace with your actual client ID

// Google OAuth2Client login
async function googleLogin(req, res) {
  const { tokenId } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID, // Replace with your actual client ID
    });

    const { name, email, picture } = ticket.getPayload();

    // Check if the user with this email exists in your database
    let user = await User.findOne({ email });

    if (!user) {
      // If the user doesn't exist, create a new user
      user = new User({
        googleId: ticket.getUserId(),
        name,
        email,
        // You can add more fields as needed
      });
      await user.save();
    }

    // Set up a session or generate an access token for the user
    // This depends on your authentication strategy (e.g., using passport.js for sessions or generating JWTs)

    // Send a response to the client
    res.json({ user });

  } catch (error) {
    console.error('Google authentication error:', error);
    res.status(401).json({ message: 'Google authentication failed.' });
  }
}

// Other user-related functions can be added here

module.exports = {
  googleLogin,
  // Other user-related functions
};
