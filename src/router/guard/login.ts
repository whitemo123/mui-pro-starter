import { useUserStore } from '@/store';
import { useNProgress } from '@/hooks/useNProgress'
import { getToken } from '@/utils/auth';
import { Base64 } from 'js-base64'
import config from '@/config';
import type { Router } from "vue-router";


export default function loginGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 用户store
    const userStore = useUserStore()
    // nprogress hook
    const { start } = useNProgress()
    // 开始加载条
    start()

    // 白名单直接放行
    if (config.routerWhiteList.includes(to.name as string)) {
      next()
      return
    }

    // 跳转登录页
    if (to.path === '/login') {
      if (getToken()) {
        next({path: '/'})
      } else {
        next()
      }
      return
    }

    if (getToken()) {
      // 已经登录
      if (!userStore.userInfo || !Object.keys(userStore.userInfo).length) {
        // 用户信息空
        try {
          await userStore.getUserInfo()
          next()
        } catch (err) {
          // 获取用户信息失败跳转登录
          await userStore.logOut()
          next({
            path: '/login',
            query: {
              url: Base64.encode(to.fullPath)
            },
            replace: true
          })
        }
      } else {
        next()
      }
    } else {
      // 没有登录
      next({
        path: '/login',
        query: {
          url: Base64.encode(to.fullPath)
        },
        replace: true
      })
    }
  })
}
