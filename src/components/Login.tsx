// src/components/Login.tsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { walletAddress, connectWallet, signIn, isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Redirect to dashboard if user is already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  return (
    <div>
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
    </div>
  );
};

export default Login;
