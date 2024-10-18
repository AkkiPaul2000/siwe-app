//api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getNonce = async (walletAddress: string) => {
  return axios.get(`${API_URL}/nonce?wallet=${walletAddress}`);
};

export const login = async (walletAddress: string, message: string, signature: string) => {
  return axios.post(`${API_URL}/login`, { walletAddress, message, signature });
};
