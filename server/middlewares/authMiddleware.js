// authMiddleware.js

function requireAuth(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required.' });
    }
    // If req.user exists, it means the user is authenticated
    next();
  }
  
  module.exports = requireAuth;
  