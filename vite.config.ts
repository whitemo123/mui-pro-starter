import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// tsx
import VueJsx from '@vitejs/plugin-vue-jsx'

import Unocss from 'unocss/vite'

import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // 加载环境变量文件
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    //插件
    plugins: [
      vue(),
      VueJsx(),
      Unocss()
    ],
    // alias配置
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    base: env.VITE_APP_BASE,
    server: {
      host: '0.0.0.0',
      port: 81,
      proxy: {
        "/api": {
          target: "http://30864j2v89.wicp.vip",
          ws: true,
          changeOrigin: true
        }
      }
    }
  })
}

