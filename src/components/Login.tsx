// src/components/Login.tsx
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const {
    walletAddress,
    connectWallet,
    signIn,
    isSignedIn,
  } = useAuth(); // Custom AuthContext hooks
  const navigate = useNavigate(); // React Router navigation
  const [loading, setLoading] = useState<boolean>(false); // Handle button states
  const [error, setError] = useState<string | null>(null); // Display errors

  // Redirect user to the dashboard if already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate('/dashboard');
    }
  }, [isSignedIn, navigate]);

  // Handle wallet connection with error handling
  const handleConnectWallet = async () => {
    setLoading(true); // Disable button during wallet connection
    setError(null); // Clear previous errors
    try {
      await connectWallet(); // Trigger wallet connection
    } catch (err: any) {
      console.error('Wallet connection failed:', err);
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  // Handle sign-in process with error handling
  const handleSignIn = async () => {
    setLoading(true); // Disable button during sign-in
    setError(null); // Clear previous errors
    try {
      await signIn(); // Trigger sign-in
      navigate('/dashboard'); // Redirect on success
    } catch (err: any) {
      console.error('Sign-in failed:', err);
      setError('Failed to sign in. Please try again.');
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <div>
      <h1>Login with Ethereum</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display errors */}

      {!walletAddress ? (
        <button onClick={handleConnectWallet} disabled={loading}>
          {loading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div>
          <p>Connected Wallet: {walletAddress}</p>
          {!isSignedIn && (
            <button onClick={handleSignIn} disabled={loading}>
              {loading ? 'Signing In...' : 'Sign-In'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Login;
