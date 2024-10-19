import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';

const server = setupServer(
  // Mock the nonce endpoint
  rest.get('http://localhost:5000/nonce', (req, res, ctx) => {
    return res(ctx.json({ nonce: 123 }));
  }),
  // Mock the login endpoint
  rest.post('http://localhost:5000/login', (req, res, ctx) => {
    return res(ctx.json({ token: 'token123' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('full SIWE flow and ProtectedRoute', async () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  );

  // Initially should redirect to login
  expect(screen.getByText(/login/i)).toBeInTheDocument();

  // Mock wallet connection
  window.ethereum = {
    request: jest.fn().mockResolvedValue(['0x123']),
  };

  // Mock signing message
  const mockSigner = {
    signMessage: jest.fn().mockResolvedValue('signature'),
  };
  const mockProvider = {
    getSigner: jest.fn().mockReturnValue(mockSigner),
  };
  jest.spyOn(require('ethers'), 'Web3Provider').mockReturnValue(mockProvider);

  // Simulate wallet connection
  fireEvent.click(screen.getByText(/connect wallet/i));
  await waitFor(() => expect(localStorage.getItem('walletAddress')).toBe('0x123'));

  // Simulate sign-in
  fireEvent.click(screen.getByText(/sign in/i));
  await waitFor(() => expect(localStorage.getItem('token')).toBe('token123'));

  // Expect to be redirected to the dashboard
  expect(screen.getByText(/your ethereum address/i)).toBeInTheDocument();
  expect(screen.getByText(/0x123/i)).toBeInTheDocument();

  // Test sign out
  fireEvent.click(screen.getByText(/sign-out/i));
  await waitFor(() => expect(localStorage.getItem('token')).toBeNull());
  expect(screen.getByText(/login/i)).toBeInTheDocument();
});
