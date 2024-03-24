import { createPinia } from 'pinia'

// menu store
import { useMenuStore } from './modules/menu'
// tags store
import { useTagsStore } from './modules/tags'   

export {
  useMenuStore,
  useTagsStore
}

export default createPinia()
