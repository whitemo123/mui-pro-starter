import { shallowRef } from 'vue'
import { RouteRecordRaw } from 'vue-router'
import config from "@/config";
import defaultLayout from '@/layouts/default-layout.vue';
import pageLayout from '@/layouts/page-layout.vue';

// 拿到src目录下的所有vue文件
const modules = import.meta.glob(['@/views/**/*.vue'])


/**
 * 是否一级目录
 * @param row 数据
 * @returns 
 */
const isFirstlevelFolder = (row: any) => {
  if (row.type === 1 && !row.parentId) {
    return true
  }
  return false
}

/**
 * 是否多级目录
 * @param row 数据
 */
const isMultilevelFolder = (row: any) => {
  if (row.parentId != "" && row.type === 1) {
    return true
  }
  return false
}

/**
 * 转化路由数据
 * @param menus 路由数据
 * @param first 首路由
 * @returns 
 */
export const formatRoutes = (menus: any = []) => {
  const menuConfig = config.menu;

  const resultRouters: RouteRecordRaw[] = []

  if (menus && !menus.length) return;
  for (let i = 0; i < menus.length; i++) {
    const menu = menus[i]

    // 路由地址
    const path = menu[menuConfig.path],
      // 组件路径
      component = menu[menuConfig.component],
      // 组件名称
      name = menu[menuConfig.name],
      // 子路由
      children = menu[menuConfig.children],
      // 配置信息
      meta = menu[menuConfig.meta] || {};

    const isChild = !!(children && children.length);

    const menuObj: RouteRecordRaw = {
      path,
      name,
      meta,
      component: (() => {
        // 一级目录
        if (isFirstlevelFolder(menu)) {
          return shallowRef(defaultLayout)
        }
        // 判断是否为多层路由
        if (isMultilevelFolder(menu)) {
          return shallowRef(pageLayout)
        }
        return modules[`/src/views${component}.vue`]
      })(),
      children: !isChild ? (() => {
        return []
      })() : (() => {
        // @ts-ignore
        return formatRoutes(children)
      })()
    }
    resultRouters.push(menuObj)
  }
  return resultRouters
}
