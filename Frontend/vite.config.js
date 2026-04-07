import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Corrected spelling here

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()], // Corrected spelling here
})