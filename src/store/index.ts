import { createPinia } from 'pinia'

// menu store
import { useMenuStore } from './modules/menu'
// tags store
import { useTagsStore } from './modules/tags'
// user store
import { useUserStore } from './modules/user'

export {
  useMenuStore,
  useTagsStore,
  useUserStore
}

export default createPinia()
