import { useMenuStore } from "@/store";
import { getToken } from "@/utils/auth";
import { useNProgress } from '@/hooks/useNProgress'
import type { Router } from "vue-router";

export default function permissionGuard(router: Router) {
  router.beforeEach(async (to, _, next) => {
    const menuStore = useMenuStore()
    if (getToken() && !menuStore.added) {
      // 没添加过menu
      await menuStore.getServerMenus()
      // 循环路由添加到vue-router
      menuStore.menus.forEach(item => {
        router.addRoute(item)
      })
      next({...to, replace: true})
    } else {
      next()
    }
  })

  router.afterEach((to) => {
    // nprogress hook
    const { done } = useNProgress()
    document.title = to.meta.title as string || ''
    done()
  })
  
}
