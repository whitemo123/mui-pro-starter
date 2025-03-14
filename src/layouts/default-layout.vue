<script setup lang="ts">
import { useMenuStore } from '@/store'
// 侧边栏
import SideBar from './components/siderBar/index.vue'
// 顶部栏
import Top from './components/top/index.vue'

// 页面路由
import PageLayout from './page-layout.vue'

const menuStore = useMenuStore()
</script>

<template>
  <div class="mui-contail" :class="{'mui--collapse': menuStore.collapsed}">
    <div class="mui-left">
      <SideBar />
    </div>
    <div class="mui-right flex flex-col items-center justify-start">
      <div class="mui-header">
        <Top />
      </div>
      <div class="mui-container flex-1">
        <PageLayout />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mui-contail {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--mui-container-bg);
  font-family: Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
  .mui-left {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 240px;
    transition: width .3s;
  }
  .mui-right {
    width: 100%;
    height: 100%;
    padding-left: 240px;
    transition: padding-left .3s;
    box-sizing: border-box;

    .mui-header {
      width: 100%;
    }

    .mui-container {
      width: 100%;
      height: calc(100vh - 104px);
      padding-top: 10px;
      box-sizing: border-box;
    }
  }
}
.mui--collapse {
  .mui-left {
    width: 60px;
  }
  .mui-right {
    padding-left: 60px;
  }
}
</style>
