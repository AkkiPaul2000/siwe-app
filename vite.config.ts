// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer', // Alias Buffer for the browser
      process: 'process/browser', // Alias process for browser use
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process', 'ethers'], // Ensure these modules are bundled
  },
});
