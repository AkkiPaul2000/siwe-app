// src/components/Dashboard.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { walletAddress, signOut } = useAuth();
  const navigate = useNavigate();

  // Handle Sign-Out: Clear session and navigate to login page
  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  return (
    <div>
      <h2>Welcome to your dashboard!</h2>
      <p>Your Ethereum address: {walletAddress}</p>
      <button onClick={handleSignOut}>Sign-Out</button>
    </div>
  );
};

export default Dashboard;
