import { defineAsyncComponent } from 'vue'
import type { App } from 'vue'

// 获取指定规则的全局组件
const components: any = import.meta.glob("@/components/**/index.vue")

export default (app: App) => {
  for (const key in components) {
    const arr = key.split('/')
    const name = arr[arr.length - 2]
    app.component(name, defineAsyncComponent(components[key]))
  }
}
