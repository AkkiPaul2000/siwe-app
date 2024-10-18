// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

// ProtectedRoute component to restrict access to signed-in users
const ProtectedRoute = ({ element }) => {
  const { isSignedIn } = useAuth();

  // Redirect to login if not signed in (i.e., no token present)
  return isSignedIn ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Root Route - Redirect to login by default */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Dashboard Route (Protected) */}
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

          {/* Catch-All Route for undefined sub-routes, redirect to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
