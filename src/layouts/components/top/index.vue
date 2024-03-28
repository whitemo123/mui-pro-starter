<script setup lang="ts">
import Header from './header.vue'
import Tabbar from './tabbar.vue'
</script>

<template>
  <div class="mui-top">
    <!--header-->
    <Header />
    <!--tabbar-->
    <Tabbar />
  </div>
</template>

<style lang="scss" scoped>
.mui-top {
  background: var(--mui-top-bg);
}
</style>

