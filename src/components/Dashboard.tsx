// src/components/Dashboard.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { walletAddress, isSignedIn, signOut } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if not signed in
  if (!isSignedIn) {
    navigate('/login');
  }

  return (
    <div>
      <h2>Welcome to your dashboard!</h2>
      <p>Your Ethereum address: {walletAddress}</p>
      <button onClick={signOut}>Sign-Out</button>
    </div>
  );
};

export default Dashboard;
