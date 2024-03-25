import { useMenuStore } from "@/store";
import { useNProgress } from '@/hooks/useNProgress'
import type { Router } from "vue-router";

export default function permissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    const menuStore = useMenuStore()
    if (!menuStore.added) {
      // 没添加过menu
      await menuStore.getServerMenus()
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
