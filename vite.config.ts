import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // This securely passes the environment variable from Vercel's build environment to your client app
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})