<script setup lang="ts">
import config from '@/config';
import { useRouter } from 'vue-router'
import { useTagsStore } from '@/store';

const tagsStore = useTagsStore()
const router = useRouter()

/**
 * 打开标签
 * @param data 标签数据
 */
const openTag = (data: any) => {
  router.push({
    path: data.value,
    query: data.query
  })
}

/**
 * @description 标签点击
 * @param data 标签数据
 */
const tagClick = (data: any) => {
  if (data.value === tagsStore.tag.value) {
    return;
  }
  openTag(data)
}

/**
 * @description 标签关闭
 * @param data 标签数据
 */
const tagClose = (data: any) => {
  if (data.value === tagsStore.tag.value) {
    // 删除的是当前这个
    let index = tagsStore.tagList.findIndex(ele => ele.value === data.value)
    // 向前删除
    const tagData: any = tagsStore.tagList[index - 1]
    tagsStore.setTag(tagData)
    openTag(tagData)
  }
  tagsStore.delTag(data)
}

/**
 * @description 删除其它
 * @param data 标签数据
 */
const closeOther = (data: any) => {
  tagsStore.delOtherTag(data)
  tagsStore.setTag(data)
  openTag(data)
}

/**
 * @description 关闭全部
 */
const closeAll = () => {
  tagsStore.delAllTag()
  const first = tagsStore.tagList[0]
  tagsStore.setTag(first)
  openTag(first)
}
</script>

<template>
  <div class="mui-tabbar flex justify-left items-center">
    <el-dropdown
      v-for="tag in tagsStore.tagList"
      :key="tag.value"
      size="small"
      trigger="contextmenu"
    >
      <el-tag
        :closable="tag.value !== config.homePath"
        :type="tagsStore.tag.value === tag.value ? 'primary' : 'info'"
        size="large"
        @click="tagClick(tag)"
        @close="tagClose(tag)"
      >
        {{ tag.meta?.title }}
      </el-tag>
      <template #dropdown>
        <el-dropdown-item @click="closeOther(tag)">关闭其它</el-dropdown-item>
        <el-dropdown-item @click="closeAll">关闭所有</el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
</template>

<style lang="scss" scoped>
.mui-tabbar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  border-top: 1px solid #f6f6f6;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,.05);
  padding: 0 10px;
  box-sizing: border-box;
  overflow: hidden;
  :deep(.el-dropdown) {
    margin-left: 10px;
    &:first-child {
      margin-left: 0;
    }
  }
  :deep(.el-tag) {
    cursor: pointer;
    &:hover {
      --el-tag-text-color: #409eff;
      --el-tag-bg-color: #ecf5ff;
    }
  }
}
</style>

