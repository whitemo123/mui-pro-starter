import { App } from "vue"

// 错误插件
import error from './plugins/error'
// 状态管理插件
import store from './plugins/store'
// 路由插件
import router from "./plugins/router"
// element-plus插件
import elementPlus from "./plugins/elementPlus"
// crud插件
import crud from "./plugins/crud"
// css样式初始化
import "normalize.css"
// 通用样式
import "@/style/index.scss"

export default (app: App) => {
  // 使用错误插件
  app.use(error)
  // 使用状态管理插件
  app.use(store)
  // 使用路由插件
  app.use(router)
  // 使用element-plus插件
  app.use(elementPlus)
  // 使用m-element-plus(crud)
  app.use(crud)
}
