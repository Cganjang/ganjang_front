import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// @repo/ui는 package.json exports를 통해 dist/index.js, dist/index.css를 참조합니다.
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@repo/ui'],
  },
})
