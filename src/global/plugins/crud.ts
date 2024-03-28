import { App } from 'vue'

// m-element-plus(crud)
import MElementPlus from 'm-element-plus'
import 'm-element-plus/dist/index.css'

import { webRequest } from "@/request";

export default (app: App) => {
  // 使用m-element-plus
  app.use(MElementPlus, {
    // 表格高度额外控制
    calcHeight: 30,
    // 注入业务request get请求
    httpGet: webRequest.get.bind(webRequest)
  })
}
