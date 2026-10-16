import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Relative base ensures assets work on GitHub Pages (https://ajaynxt.github.io/body/) and localhost
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/pdfjs-dist')) {
            return 'pdfjs-vendor';
          }
          if (id.includes('node_modules/three') || id.includes('meshoptimizer')) {
            return 'three-vendor';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide-icons';
          }
          if (id.includes('src/data/chapters') || id.includes('src/data/diseases')) {
            return 'medical-data';
          }
        },
      },
    },
  },
});
