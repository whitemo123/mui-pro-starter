import { defineConfig, loadEnv } from 'vite'
// vue
import vue from '@vitejs/plugin-vue'
// tsx
import VueJsx from '@vitejs/plugin-vue-jsx'
// unocss
import Unocss from 'unocss/vite'

// import vitePluginFile2Route from 'vite-plugin-file2route'

import path from 'path'

// https://vitejs.dev/config/
export default ({ mode }) => {
  // 加载环境变量文件
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    css: {
      preprocessorOptions: {
          scss: {
              api: 'modern-compiler', // or 'modern'
          },
      },
    },
    //插件
    plugins: [
      vue(),
      VueJsx(),
      Unocss(),
      // vitePluginFile2Route()
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
          // target: "http://30864j2v89.wicp.vip",
          target: "http://127.0.0.1:8080",
          ws: true,
          changeOrigin: true
        },
        // "/test-api": {
        //   target: "http://127.0.0.1:3000",
        //   ws: true,
        //   changeOrigin: true
        // }
      },
      allowedHosts: ["example.whitemo.xyz"]
    }
  })
}

