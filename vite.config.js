import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  server: {
    host: true,
    port: 3000
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    emptyOutDir: true,
  }
})
