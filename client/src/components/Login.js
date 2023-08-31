// Login.js

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice'; // Adjust the path to your authSlice

function Login() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const error = useSelector((state) => state.auth.error);

  const handleGoogleLogin = async (tokenId) => {
    try {
      await dispatch(loginUser(tokenId));
      // Handle successful login here (e.g., redirect to dashboard)
    } catch (error) {
      // Handle login error (display error message to user)
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <div className="error-message">{error}</div>}
      <button
        onClick={() => handleGoogleLogin('google_token_id')} // Pass the actual token ID
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login with Google'}
      </button>
    </div>
  );
}

export default Login;
