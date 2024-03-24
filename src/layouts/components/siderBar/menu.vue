<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '@/store'

const menuStore = useMenuStore()
const route = useRoute()

const nowTagValue = computed<string>(() => {
  return route.path
})
</script>

<template>
  <div class="mui-menu">
    <div
      v-if="!menuStore.menu || !menuStore.menu.length"
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
    >
      
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
    top:5px;
    left:5%;
    color:#ccc;
    z-index: 2;
    text-align: center;
    font-size: 14px;
    background-color: rgba(0,0,0,.4);
  }
}
</style>