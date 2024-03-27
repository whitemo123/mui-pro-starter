import { createPinia } from 'pinia'

// 系统 store
import { useSysStore } from './modules/sys'
// menu store
import { useMenuStore } from './modules/menu'
// tags store
import { useTagsStore } from './modules/tags'
// user store
import { useUserStore } from './modules/user'


export {
  useMenuStore,
  useTagsStore,
  useUserStore,
  useSysStore
}

export default createPinia()
