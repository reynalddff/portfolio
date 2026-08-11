import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Deployed at https://reynald-portfolio.netlify.app/case-study/
export default defineConfig({
  plugins: [react()],
  base: '/case-study/',
})
