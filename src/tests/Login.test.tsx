// src/tests/Login.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../components/Login';
import { AuthProvider } from '../context/AuthContext';

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
  });

  it('renders Connect Wallet button initially', () => {
    const connectButton = screen.getByText('Connect Wallet');
    expect(connectButton).toBeInTheDocument();
  });

  it('renders Sign-In button after connecting wallet', async () => {
    // Simulate wallet connection
    const connectButton = screen.getByText('Connect Wallet');
    fireEvent.click(connectButton);

    // Check that Sign-In button is now enabled
    const signInButton = await screen.findByText('Sign-In');
    expect(signInButton).toBeInTheDocument();
  });

  it('handles wallet connect and sign-in flow', async () => {
    // Mock wallet connection
    const connectButton = screen.getByText('Connect Wallet');
    fireEvent.click(connectButton);

    // Mock sign-in
    const signInButton = await screen.findByText('Sign-In');
    fireEvent.click(signInButton);

    // Expect some result (mock actual behavior)
    const message = await screen.findByText('Signing in...');
    expect(message).toBeInTheDocument();
  });
});
