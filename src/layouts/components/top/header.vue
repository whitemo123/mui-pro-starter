<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useMenuStore, useUserStore } from '@/store'
import { ElMessageBox } from 'element-plus';

const router = useRouter()
const userStore = useUserStore()
const menuStore = useMenuStore()

/**
 * @description 切换菜单折叠
 */
const toggle = () => {
  menuStore.setCollapsed(!menuStore.collapsed)
}

/**
 * @description 退出登录
 */
const logout = () => {
  ElMessageBox.confirm('退出系统, 是否继续?', '', {}).then(() => {
    userStore.logOut().then(() => {
      router.push({
        path: '/login'
      })
    })
  })
}
</script>

<template>
  <div class="mui-header flex justify-between items-center">
    <div class="mui-header-left flex-1 flex justify-left items-center">
      <i
        @click="toggle"
        style="font-size: 24px; cursor: pointer;"
        class="iconfont icon-vuesax-linear-textalign-justifycenter"
        :class="menuStore.collapsed ? 'collapsed' : ''"
      >
      </i>
    </div>
    <div class="mui-header-right flex-1 flex justify-end items-center">
      <img
        class="avatar rounded-full"
        src="https://img2.baidu.com/it/u=1238811660,2366224124&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
      />
      <el-dropdown>
        <span class="flex justify-center items-center">
          {{ userStore.userInfo?.realName}}
          <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu >
            <el-dropdown-item>
              <router-link to="/">首页</router-link>
            </el-dropdown-item>
            <el-dropdown-item
              divided
              @click.native="logout"
            >
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mui-header {
  width: 100%;
  height: 64px;
  line-height: 64px;
  background-color: #fff;
  padding: 0 20px;
  box-sizing: border-box;

  .mui-header-left {
    i {
      transition: all .3s;
      &.collapsed {
        transform: rotate(90deg);
      }
    }
  }
  .mui-header-right {

    .avatar {
      width: 30px;
      height: 30px;
      margin: 0 8px;
    }
  }
}
</style>
