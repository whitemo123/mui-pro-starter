import loginGuard from './login'
import permissionGuard from './permission'
import listenerGuard from './listener'
import type { Router } from 'vue-router'

export default function createRouteGuard(router: Router) {
  // 路由监听
  listenerGuard(router)
  // 白名单/token判断/userInfo请求
  loginGuard(router)
  // 动态路由处理
  permissionGuard(router)
}
