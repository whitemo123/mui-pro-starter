import { createApp } from 'vue'
import 'uno.css'
import App from './App.vue'

// 全局插件
import global from '@/global'

const app = createApp(App)
app.use(global)
app.mount('#app')
