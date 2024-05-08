
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig, loadEnv } from 'vite'
// vue
import vue from '@vitejs/plugin-vue'
// tsx
import VueJsx from '@vitejs/plugin-vue-jsx'
// unocss
const Unocss = __unconfig_stub;

// import vitePluginFile2Route from 'vite-plugin-file2route'

import path from 'path'

// https://vitejs.dev/config/
const __unconfig_default =  ({ mode }) => {
  // 加载环境变量文件
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
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
          target: "http://192.168.1.44:1900",
          ws: true,
          changeOrigin: true
        }
      }
    }
  })
}


if (typeof __unconfig_default === "function") __unconfig_default(...[{"command":"serve","mode":"development"}]);export default __unconfig_data;