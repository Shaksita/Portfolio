import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths — the build works at a domain root, in a subfolder, or
  // on GitHub Pages without further configuration.
  base: './',
  server: {
    port: 5173,
    open: true,
    // Vite rejects requests whose Host header it does not recognise. Allow the
    // Cloudflare quick-tunnel domain so a temporary public URL can reach it.
    allowedHosts: ['.trycloudflare.com'],
  },
  preview: {
    port: 4173,
    allowedHosts: ['.trycloudflare.com'],
  },
});
