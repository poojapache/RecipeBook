import './App.css';
import ProfilePage from './Pages/ProfilePage';
import HomePage from './Pages/HomePage';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate for redirection
import axios from 'axios';

axios.defaults.withCredentials = true;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // To handle loading state

  // useEffect(() => {
  //   // Make a request to the backend to check if the user is authenticated
  //   axios.get(`${process.env.REACT_APP_API_URL}/check-auth/`)
  //     .then(response => {
  //       if (response.status === 200) {
  //         // User is authenticated, set isLoggedIn to true
  //         console.log('Authenticated:', response.data);
  //         setIsLoggedIn(true);
  //       }
  //     })
  //     .catch(error => {
  //       // User is not authenticated or token is invalid/expired
  //       console.error('Authentication error:', error);
  //       setIsLoggedIn(false);
  //     })
  //     .finally(() => {
  //       // Stop loading after the request is finished
  //       setLoading(false);
  //     });
  // }, []); // Add an empty dependency array to run only once

  // if (loading) {
  //   // Display a loading message or spinner while checking authentication
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Conditionally render the HomePage or ProfilePage based on authentication */}
          <Route path="/" element={!isLoggedIn ? <ProfilePage /> : <HomePage />} />
          {/* Add a /profile route that redirects based on authentication */}
          <Route path="/profile" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
