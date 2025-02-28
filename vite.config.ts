import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/weatherbit': {
        target: 'https://api.weatherbit.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weatherbit/, '/v2.0')
      }
    }
  }
})
