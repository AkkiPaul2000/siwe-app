import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import * as buffer from 'buffer'; // Import Buffer for compatibility

// Make Buffer globally available (required for ethers.js in some environments)
window.Buffer = buffer.Buffer;

// Define the shape of the AuthContext
interface AuthContextType {
  walletAddress: string | null;
  isSignedIn: boolean;
  connectWallet: () => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  // Connect to the wallet (MetaMask)
  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error('MetaMask is not installed');

      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      let wallet = accounts[0];
      wallet = ethers.utils.getAddress(wallet);

      setWalletAddress(wallet);
      localStorage.setItem('walletAddress', wallet);
    } catch (error) {
      console.error('Wallet connection failed:', error.message);
    }
  };

  // Sign in with Ethereum (no tokens, only state management)
  const signIn = async () => {
    if (!walletAddress) {
      console.error('No wallet address found. Please connect your wallet.');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Request nonce from the backend
      const { data: { nonce } } = await axios.get(`http://localhost:5000/nonce?wallet=${walletAddress}`);

      const message = `${walletAddress} wants you to sign in:\nNonce: ${nonce}`;
      const signature = await signer.signMessage(message);

      // Send signed message to backend to validate login
      const { data } = await axios.post('http://localhost:5000/login', {
        message,
        signature,
        walletAddress,
      });

      // If successful, update state (no token required)
      setIsSignedIn(true);
    } catch (error) {
      console.error('Sign-in failed:', error.response?.data || error.message);
      alert('Failed to sign in. Please try again.');
    }
  };

  // Sign out the user and clear session (just local state management)
  const signOut = () => {
    localStorage.removeItem('walletAddress');
    setWalletAddress(null);
    setIsSignedIn(false);
  };

  useEffect(() => {
    const savedAddress = localStorage.getItem('walletAddress');
    if (savedAddress) {
      setWalletAddress(savedAddress);
      setIsSignedIn(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ walletAddress, isSignedIn, connectWallet, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
