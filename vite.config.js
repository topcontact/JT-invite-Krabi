import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/rsvp': {
          target: env.GOOGLE_SCRIPT_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => '', // Remove /api/rsvp prefix entirely, sending body to the target URL
        }
      }
    }
  }
})
