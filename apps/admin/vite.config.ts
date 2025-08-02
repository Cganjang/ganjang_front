import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@repo/ui/styles': resolve(__dirname, '../../packages/ui/src/styles/index.scss'),
      '@repo/ui': resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['@repo/ui'],
  },
  server: {
    force: true,
  }
})
