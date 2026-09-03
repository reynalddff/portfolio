import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Unified app: serves the whole site (/, /case-study/:slug, /side-project/:slug) at the domain root.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
