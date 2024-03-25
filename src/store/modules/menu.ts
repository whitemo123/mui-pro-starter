import { ref, computed, h } from 'vue';
import { defineStore } from 'pinia';
import { RouteRecordRaw } from 'vue-router';
import { getMenuApi } from '@/apis/core';
import { formatRoutes } from '@/utils/menu'
import { ItemType } from 'ant-design-vue';

export const useMenuStore = defineStore('menu', () => {
  // 已经添加
  const added = ref(false)

  // menu数组
  const menus = ref<RouteRecordRaw[]>([])

  // 菜单收缩
  const collapsed = ref(false)

  /**
   * 菜单绑定的值
   */
  const aMenuList = computed(() => {
    const transform = (arr: RouteRecordRaw[], list: ItemType[] = []) => {
      if (arr) {
        arr.forEach(element => {
          // @ts-ignore
          const childres = transform(element.children)
          const node: ItemType = {
            key: element.path,
            label: element!.meta!.title as string,
            title: element!.meta!.title as string,
            icon: h('i', { class: 'iconfont icon-vuesax-linear-home-2' }),
            // @ts-ignore
            children: childres.length ? childres : null
          }
          list.push(node)
        })
      }
      return list;
    }
    return transform(menus.value);
  })

  /**
   * 设置菜单收缩状态
   * @param status 收缩状态
   */
  const setCollapsed = (status: boolean) => {
    collapsed.value = status;
  }

  /**
   * 设置菜单
   * @param data 
   */
  const getServerMenus = () => {
    return new Promise(resolve => {
      getMenuApi().then(e => {
        const arr = formatRoutes(e);
        menus.value = arr as RouteRecordRaw[];
        added.value = true
        resolve(null)
      })
    })
  }

  return {
    aMenuList,
    collapsed,
    added,
    menus,
    getServerMenus,
    setCollapsed
  }
})
