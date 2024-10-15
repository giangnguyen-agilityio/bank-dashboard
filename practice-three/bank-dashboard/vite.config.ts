import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), EnvironmentPlugin(['VITE_APP_API_URL'])],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src'),
    },
  },
  server: {
    open: true,
  },
});
