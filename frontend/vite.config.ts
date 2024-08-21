import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';  // Import the React plugin
import { resolve } from 'path';

export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      // This ensures that Vite uses the buffer polyfill in the browser
      buffer: 'buffer/'
    }
  },
  define: {
    // Required for the buffer polyfill to work correctly
    global: 'globalThis'
  }
});
