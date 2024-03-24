<script setup lang="ts">
import config from '@/config';
import Menu from './menu.vue'
import { useMenuStore } from '@/store'

const menuStore = useMenuStore()
</script>

<template>
  <div class="mui-siderbar">
    <div class="logo">
      <img v-if="config.logo" :src="config.logo" alt="">
      <span v-if="!menuStore.collapsed">MUI-PRO</span>
    </div>
    <div class="scroll-box">
      <Menu />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mui-siderbar {
  height: 100%;
  transition: width .3s;
  box-sizing: border-box;
  box-shadow: 2px 0 6px rgba(0,21,41,.35);
  background: #20222a;

  .logo {
    height: 64px;
    color: rgba(255, 255, 255, 0.8);
    font-size: 20px;

    display: flex;
    justify-content: center;
    align-items: center;
    img {
      margin-right: 10px;
    }
    span {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .scroll-box {
    width: 100%;
    height: calc(100% - 64px);
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
