import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/ui/components'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/services': path.resolve(__dirname, 'src/services'),
      '@/assets': path.resolve(__dirname, 'src/assets'),
      '@/lib': path.resolve(__dirname, 'src/lib'),
      '@/ui': path.resolve(__dirname, 'src/ui'),
      '@/mock': path.resolve(__dirname, 'src/mock'),
    },
  },
});
