<script setup lang="ts">
import { useMenuStore } from '@/store';
const env: any = import.meta.env;

const menuStore = useMenuStore()
</script>

<template>
  <div class="page">
    <div class="page-container">
      <slot />
      <div v-if="env.VITE_FOOTER" class="footer" :class="menuStore.collapsed ? 'col' : ''">{{ env.VITE_FOOTER }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  height: 100%;
  overflow-y: auto;
  padding: 0 10px;
  box-sizing: border-box;

  .page-container {
    width: 100%;
    // max-height: calc(100% - 40px);
    // overflow-y: auto;
    // overflow-x: hidden;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
    // position: relative;
    .footer {
      width: 100%;
      position: absolute;
      bottom: 20px;
      left: 0;
      text-align: center;
      font-size: 12px;
      padding-left: 250px;
      box-sizing: border-box;
      &.col {
        padding-left: 70px;
      }
    }
  }
}
</style>
