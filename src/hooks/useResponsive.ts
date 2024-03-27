import { onMounted, onBeforeMount, onBeforeUnmount } from 'vue';
import { useSysStore } from "@/store"
import { useMenuStore } from "@/store";
import { useDebounceFn } from '@vueuse/core'
import { addEventListen, removeEventListen } from '@/utils/event'

const WIDTH = 992;

function queryDevice() {
  const rect = document.body.getBoundingClientRect();
  return rect.width - 1 < WIDTH;
}

export const useResponsive = (immediate?: boolean) => {
  const sysStore = useSysStore()
  const menuStore = useMenuStore()

  function resizeHandler() {
    if (!document.hidden) {
      const isMobile = queryDevice();
      sysStore.toggleDevice(isMobile ? 'mobile' : 'desktop');
      menuStore.setCollapsed(isMobile);
    }
  }
  const debounceFn = useDebounceFn(resizeHandler, 100);
  onMounted(() => {
    if (immediate) debounceFn();
  });
  onBeforeMount(() => {
    addEventListen(window, 'resize', debounceFn);
  });
  onBeforeUnmount(() => {
    removeEventListen(window, 'resize', debounceFn);
  });
}
