import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // The crucial fix is setting the base path correctly:
  base: '/', // OPTION 1: Try this first, it works best with Vercel's default settings

  // If OPTION 1 fails, try OPTION 2:
  // base: './', // OPTION 2: This makes paths relative to the current location

  plugins: [react()],
});
