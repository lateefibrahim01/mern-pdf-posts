// App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PDFList from './PDFList'; // Import your PDFList component
import UploadPDF from './UploadPDF'; // Import your UploadPDF component
import Login from './Login'; // Import your Login component
import { useSelector } from 'react-redux';

function App() {
  // Example: Use a state to manage authentication status
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Access the authentication state from Redux
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-semibold">Your App Name</h1>
        </header>
        <div className="container mx-auto py-4">
          <Switch>
            {/* Route for the login page */}
            <Route path="/login">
              <Login setIsLoggedIn={setIsLoggedIn} />
            </Route>

            {/* Route for authenticated users */}
            <Route path="/">
              {user ? (
                <div>
                  <PDFList />
                  <UploadPDF />
                </div>
              ) : (
                <Login setIsLoggedIn={setIsLoggedIn} />
              )}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
