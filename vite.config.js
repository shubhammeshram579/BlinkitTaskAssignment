import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/cubejs-api/v1": "https://amaranth-muskox.aws-us-east-1.cubecloudapp.dev/dev-mode/feat/frontend-hiring-task"
    }
  },
  plugins: [react()],
  define: {
    global: {}, // Add this to polyfill global
  },
})
