import { App } from "vue";

// element-plus
import ElementPlus from 'element-plus'
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

// element图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export default (app: App) => {
  // 注册element-plus
  app.use(ElementPlus, {
    locale: zhCn,
    size: 'default'
  })
  // 注册所有图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
