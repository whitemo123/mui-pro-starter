import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSysStore = defineStore('sys', () => {
  // 设备类型
  const device = ref<'desktop'|'mobile'>('desktop')

  /**
   * @description 切换设备
   * @param d 设备类型
   */
  const toggleDevice = (d: 'desktop'|'mobile') => {
    device.value = d;
  }

  return {
    device,
    toggleDevice
  }
})
