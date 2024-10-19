// src/components/Login.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const { walletAddress, connectWallet, signIn, isSignedIn, toggleMode, mode } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if user is already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className={styles.container}>
      <h1>Login with Ethereum</h1>
      {!walletAddress ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Wallet: {walletAddress}</p>
          {!isSignedIn && (
            <button onClick={signIn}>Sign-In with MetaMask</button>
          )}
        </div>
      )}
      {/* Toggle theme button */}
      <button onClick={toggleMode}>
        Toggle to {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default Login;
