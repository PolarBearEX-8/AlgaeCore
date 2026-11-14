import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages hosts this repository under /AlgaeCore/.
  base: process.env.GITHUB_ACTIONS ? '/AlgaeCore/' : '/',
  plugins: [react()],
})
