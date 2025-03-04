import { App } from 'vue'

// m-element-plus(crud)
import MElementPlus from 'm-eleplus-crud'
import 'm-eleplus-crud/dist/index.css'

// import zhCn from 'm-eleplus-crud/dist/locale/zh-cn'

import api from "@/request";

export default (app: App) => {
  // 使用m-element-plus
  // @ts-ignore
  app.use(MElementPlus, {
    // 默认尺寸
    size: "default",
    // 默认中文
    // locale: zhCn,
    // 表格高度额外控制
    calcHeight: 30,
    // 注入业务request get请求
    httpGet: api.get.bind(api)
  } as any)
}
