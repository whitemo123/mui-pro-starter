<script setup lang="ts">

</script>

<template>
  <div class="page">
    <div class="page-container">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: 0 10px;
  box-sizing: border-box;

  .page-container {
    width: 100%;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 4px;
  }
}
</style>
