import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  // Use absolute base so built assets are always loaded from the root URL.
  // Using './' breaks when navigating to nested routes (e.g. /auth/callback)
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://raiserealm-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
