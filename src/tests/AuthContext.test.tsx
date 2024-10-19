// src/tests/AuthContext.test.tsx
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Mock Ethereum provider (MetaMask)
const mockEthereum = {
  request: jest.fn(),
};

describe('AuthContext', () => {
  beforeAll(() => {
    // Mock window.ethereum object
    (window as any).ethereum = mockEthereum;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('connects to wallet successfully', async () => {
    mockEthereum.request.mockResolvedValue(['0x1234']);

    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.connectWallet();
    });

    expect(result.current.walletAddress).toBe('0x1234');
    expect(localStorage.getItem('walletAddress')).toBe('0x1234');
  });

  it('signs in the user', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    // Mock the walletAddress and signMessage behavior
    act(() => {
      result.current.connectWallet = jest.fn().mockResolvedValue('0x1234');
    });

    // Simulate the sign-in flow
    await act(async () => {
      await result.current.signIn();
    });

    // Expect token to be stored
    expect(localStorage.getItem('token')).toBeDefined();
    expect(result.current.isSignedIn).toBe(true);
  });

  it('signs out the user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    // Sign out
    act(() => {
      result.current.signOut();
    });

    // Check that the state is cleared
    expect(result.current.walletAddress).toBeNull();
    expect(result.current.isSignedIn).toBe(false);
    expect(localStorage.getItem('walletAddress')).toBeNull();
  });
});
