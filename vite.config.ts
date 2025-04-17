import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      cache: false,
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      exclude: ['node_modules/**', 'dist/**'],
    })
  ],
})
