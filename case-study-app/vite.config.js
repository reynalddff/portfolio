import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at https://reynalddff.github.io/portfolio/case-study/
export default defineConfig({
  plugins: [react()],
  base: '/portfolio/case-study/',
})
