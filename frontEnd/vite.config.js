import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'https://techtronics-y2b2.onrender.com', // Use http if backend is running on http
        
        secure: false
      }
    }
  },
  plugins: [react()],
});
