<template>
  <div class="error-page">
    <div
      class="img"
    >
    </div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你访问的页面不存在</div>
      <div class="actions">
        <router-link :to="{path:'/'}">
          <el-button type="primary">返回首页</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "./style.scss";
.img {
  background-image: url('@/assets/svg/404.svg');
}
</style>
