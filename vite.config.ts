import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base ensures assets work on GitHub Pages (https://ajaynxt.github.io/body/) and localhost
});
