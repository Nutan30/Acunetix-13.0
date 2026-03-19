import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/',
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;

          if (id.includes('react') || id.includes('scheduler')) {
            return 'vendor-react';
          }

          if (id.includes('react-router')) {
            return 'vendor-router';
          }

          if (id.includes('three') || id.includes('postprocessing')) {
            return 'vendor-three';
          }

          if (id.includes('framer-motion') || /[\\/]motion[\\/]/.test(id)) {
            return 'vendor-motion';
          }

          if (id.includes('face-api.js')) {
            return 'vendor-faceapi';
          }

          return undefined;
        },
      },
    },
  },
})
