import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [vue()],
  root: 'Frontend',  // <-- Важно! Корень - папка Frontend
  server: {
    port: 3001,
    open: true,
    host: true,  // <-- Добавьте это
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'Frontend'),
    },
  },
});