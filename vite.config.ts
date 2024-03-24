import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// tsx
import VueJsx from '@vitejs/plugin-vue-jsx'

import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  //插件
  plugins: [
    vue(),
    VueJsx()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 81
  }
})
