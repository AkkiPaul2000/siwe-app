// src/App.tsx
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';  // Create a simple NotFound component
import LoadingSpinner from './components/LoadingSpinner';  // Optional loading spinner component

// TypeScript: Define prop types for ProtectedRoute
interface ProtectedRouteProps {
  element: ReactElement;
}

// ProtectedRoute component to restrict access to signed-in users
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isSignedIn, walletAddress, mode } = useAuth();

  // Optional: Display loading spinner if the auth state is still being determined
  if (walletAddress === null && !isSignedIn) {
    return <LoadingSpinner />;  // Show loading spinner while checking auth state
  }
  console.log(mode)
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

          {/* Catch-All Route for undefined sub-routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
