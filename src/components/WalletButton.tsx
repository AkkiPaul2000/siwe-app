import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const WalletButton = () => {
  const { walletAddress, isSignedIn, connectWallet, signIn, signOut } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle wallet connection with loading state
  const handleConnectWallet = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await connectWallet();
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign-in with loading state
  const handleSignIn = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn();
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sign-out
  const handleSignOut = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signOut();
    } catch (err) {
      setError('Failed to sign out. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>}  {/* Display error message */}

      {!walletAddress ? (
        // Show "Connect Wallet" button if no wallet is connected
        <button onClick={handleConnectWallet} disabled={isLoading}>
          {isLoading ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div>
          <p>Connected Wallet: {walletAddress}</p>
          {!isSignedIn ? (
            // Show "Sign-In" button if wallet is connected but not signed in
            <button onClick={handleSignIn} disabled={isLoading || !walletAddress}>
              {isLoading ? 'Signing In...' : 'Sign-In'}
            </button>
          ) : (
            // Show "Sign-Out" button if wallet is connected and signed in
            <div>
              <p>Signed In!</p>
              <button onClick={handleSignOut} disabled={isLoading}>
                {isLoading ? 'Signing Out...' : 'Sign-Out'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletButton;
