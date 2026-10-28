
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/Portfolio/',
  server: {
    port: 5173,
    open: true,
    allowedHosts: ['.trycloudflare.com'],
  },
  preview: {
    port: 4173,
    allowedHosts: ['.trycloudflare.com'],
  },
});
