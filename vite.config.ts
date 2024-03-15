import { defineConfig } from 'vite'
import Path from 'path'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5174,
  },
  resolve: {
    alias: {
      '@': Path.resolve(__dirname, 'src'),
      '@common': Path.resolve(__dirname, 'src/common'),
    },
  },
})
