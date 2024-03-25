import { createRouter, createWebHistory } from "vue-router";
import createRouteGuard from './guard'

// 框架页面路由
import pages from './pages';

// 逻辑页面路由
import views from './views';

// 创建router
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE),
  routes: [
    ...pages,
    ...views
  ]
})

createRouteGuard(router)

export default router
