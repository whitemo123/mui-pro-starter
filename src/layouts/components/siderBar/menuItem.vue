<script setup lang="ts">
import config from '@/config'
import MenuItem from './menuItem.vue'

interface IProps {
  // 菜单数组
  menu: any
}

defineProps<IProps>()
</script>

<template>
  <template v-for="item in menu">
    <el-sub-menu
      v-if="item[config.menu.children] && item[config.menu.children].length"
      :index="item[config.menu.path]"
    >
      <template #title>
        <i style="margin-right: 10px;" :class="'iconfont ' + item[config.menu.meta]['icon']"></i>
        <span>{{ item[config.menu.meta]['title'] }}</span>
      </template>
      <MenuItem :menu="item[config.menu.children]" />
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="item[config.menu.path]"
    >
      <i style="margin-right: 10px;" :class="'iconfont ' + item[config.menu.meta]['icon']"></i>
      <template #title>
        <span>{{ item[config.menu.meta]['title'] }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<style lang="scss" scoped>

</style>
