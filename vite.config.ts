import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// If deploying to GitHub Pages via CI, GITHUB_PAGES env can set '/sentinelmesh/'.
// For Vercel or standard root deployments, default base is '/' so assets load properly from domain root.
export default defineConfig({
  base: process.env.VITE_BASE_PATH || (process.env.GITHUB_PAGES === 'true' ? '/sentinelmesh/' : '/'),
  plugins: [
    react(),
    tailwindcss(),
  ],
})
