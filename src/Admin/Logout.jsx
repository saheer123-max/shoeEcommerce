import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importing useNavigate from React Router

function Logout() {
  const navigate = useNavigate(); // Hook for navigating to the login page
  const [loggingOut, setLoggingOut] = useState(false); // State to track the logout action

  const handleLogout = () => {
    setLoggingOut(true); // Set loggingOut to true to show the "Logging out..." message

    // Clear user session or token from localStorage or cookies
    localStorage.removeItem('authToken'); // Clear authentication token

    // Redirect to login page after a short delay (optional)
    setTimeout(() => {
      navigate('/    '); // Navigate to the login page
    }, 1000); // You can adjust the timeout as needed
  };

  return (
    <div>
      {loggingOut ? (
        <p>Logging out...</p> // Display "Logging out..." message while logging out
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded"
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Logout;
