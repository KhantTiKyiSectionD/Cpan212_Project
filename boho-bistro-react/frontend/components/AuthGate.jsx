// frontend/src/components/AuthGate.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// For demo purposes - in real app, this would check for valid token
const isAuthenticated = () => {
  // Simulating admin access for demo
  // You can set a localStorage flag for the demo: localStorage.setItem('isAdmin', 'true')
  return localStorage.getItem('isAdmin') === 'true';
};

const AuthGate = ({ children }) => {
  if (!isAuthenticated()) {
    // Redirect to a placeholder "login" or show message
    return (
      <div>
        <h2>Admin Access Required</h2>
        <p>This section requires administrator privileges.</p>
        {/* For demo, add a button to simulate login */}
        <button onClick={() => {
          localStorage.setItem('isAdmin', 'true');
          window.location.reload();
        }}>
          Simulate Admin Login (for Demo)
        </button>
      </div>
    );
  }

  return children;
};

export default AuthGate;