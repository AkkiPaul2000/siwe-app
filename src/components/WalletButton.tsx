import React from 'react';
import { useAuth } from '../context/AuthContext';

const WalletButton = () => {
  const { walletAddress, isSignedIn, connectWallet, signIn, signOut } = useAuth();

  return (
    <div>
      {!walletAddress ? (
        // Show "Connect Wallet" button if no wallet is connected
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <div>
          <p>Connected Wallet: {walletAddress}</p>
          {!isSignedIn ? (
            // Show "Sign-In" button if wallet is connected but not signed in
            <button onClick={signIn} disabled={!walletAddress}>Sign-In</button>
          ) : (
            // Show "Sign-Out" button if wallet is connected and signed in
            <div>
              <p>Signed In!</p>
              <button onClick={signOut}>Sign-Out</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletButton;
