import { App } from 'vue'

// m-element-plus(crud)
import MElementPlus from 'm-element-plus'
import 'm-element-plus/dist/index.css'

export default (app: App) => {
  // 使用m-element-plus
  app.use(MElementPlus)
}