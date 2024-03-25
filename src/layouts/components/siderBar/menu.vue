<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/store'
import MenuItem from './menuItem.vue'

const menuStore = useMenuStore()
const route = useRoute()
const router = useRouter()

/**
 * @description 当前打开的path
 */
const nowTagValue = computed<string>(() => {
  return route.path
})

/**
 * @description 菜单选择
 * @param index 
 */
const menuSelect = (index: string) => {
  router.push({
    path: index
  })
}
</script>

<template>
  <div class="mui-menu">
    <div
      v-if="!menuStore.menus || !menuStore.menus.length"
      class="mui-sidebar-tip"
    >
      没有发现菜单
    </div>
    <el-menu
      unique-opened
      :default-active="nowTagValue"
      mode="vertical"
      :show-timeout="200"
      :collapse="menuStore.collapsed"
      @select="menuSelect"
    >
      <MenuItem :menu="menuStore.menus" />
    </el-menu>
  </div>
</template>

<style lang="scss" scoped>
.mui-menu {
  width: 100%;
  height: 100%;
  position: relative;
  user-select: none;
  .mui-sidebar-tip {
    width: 90%;
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    position: absolute;
    top: 5px;
    left: 5%;
    color:#ccc;
    z-index: 2;
    text-align: center;
    font-size: 14px;
    background-color: rgba(0,0,0,.4);
  }
  :deep(.el-menu) {
    background: transparent;
    border-right: none;

    .el-sub-menu__title {
      color: hsla(0,0%,100%,.7);
      &:hover {
        background: transparent;
        color: #fff;
      }
    }
    .el-menu-item {
      color: hsla(0,0%,100%,.7);
      background: transparent;
      &:hover {
        background: transparent;
        color: #fff;
      }
      &.is-active {
        background: rgba(0,0,0,.8);
        color: #fff;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 4px;
          background-color: #409eff;
        }
      }
    }
  }
}
</style>
