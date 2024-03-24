import { ref } from 'vue'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import { getStorage } from '@/utils/storage'

export const useMenuStore = defineStore('menu', () => {
  // 菜单收缩
  const collapsed = ref(false)

  // 菜单
  const menu = ref<RouteRecordRaw[]>(getStorage('menu') || [])

  return {
    collapsed,
    menu
  }
})