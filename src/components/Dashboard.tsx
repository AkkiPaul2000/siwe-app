// src/components/Dashboard.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';  // Import CSS module

const Dashboard = () => {
  const { walletAddress, signOut, toggleMode, mode } = useAuth();
  const navigate = useNavigate();
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);  // Track sign-out state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);  // Track error state

  // Handle Sign-Out: Clear session and navigate to login page
  const handleSignOut = async () => {
    setIsSigningOut(true);
    setErrorMessage(null);  // Clear previous errors

    try {
      await signOut();  // Assuming signOut is asynchronous
      navigate('/login');  // Redirect to login after successful sign-out
    } catch (error) {
      setErrorMessage('Failed to sign out. Please try again.');  // Handle potential error
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Welcome to your dashboard!</h2>
      <p>Your Ethereum address: {walletAddress}</p>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}  {/* Display error message if any */}

      <button onClick={handleSignOut} disabled={isSigningOut}>
        {isSigningOut ? 'Signing Out...' : 'Sign-Out'}
      </button>

      <button onClick={toggleMode}>
        Toggle to {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default Dashboard;
