//App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
// import WalletButton from './components/WalletButton';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          {/* You can add a navigation bar or header component here if needed */}
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to /login */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* You can add additional routes here as needed */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
