import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/weatherbit': {
        target: 'https://api.weatherbit.io/v2.0',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/weatherbit/, '')
      }
    }
  }
})
