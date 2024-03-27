import { ref, computed } from 'vue'
import { defineStore } from 'pinia';
import config from '@/config';
import { getStorage, setStorage } from '@/utils/storage';
import { diff } from '@/utils/util';
import type { Tag } from '@/types/tags'

// 空tag对象
const emptyTag: Tag = {
  // 标题名称
  label: '',
  // 标题的路径
  value: '',
  // 标题的路径参数
  params: '',
  // 标题的参数
  query: '',
  // 额外参数
  meta: {}
}

// 首页tag
const homeTag: Tag = {
  // 标题名称
  label: 'WelIndex',
  // 标题的路径
  value: '/wel/index',
  // 标题的路径参数
  params: {},
  // 标题的参数
  query: {},
  // 额外参数
  meta: {
    title: '首页'
  }
}

export const useTagsStore = defineStore('tags', () => {
  // 标签列表
  const tagList = ref<Tag[]>(getStorage('tagList', 'localStorage') || [])
  // 当前tag
  const tag = ref<Tag>(getStorage('tag', 'localStorage') || emptyTag)

  // 需要缓存的标签
  const tagsKeep = computed(() => {
    return tagList.value.filter(ele => ele.meta[config.menu.keepAlive]).map(ele => ele.label)
  })

  /**
   * @description 设置当前路由
   * @param data 路由数据
   */
  const setTag = (data: Tag) => {
    // 设置当前tag
    tag.value = data
    setStorage('tag', data, 'localStorage')
  }

  /**
   * @description 添加tag
   * @param data 路由数据
   * @returns 
   */
  const addTag = (data: Tag) => {
    if (!data) {
      return
    }
    // 设置当前路由
    setTag(data)
    // 查找对应的路由是否已添加到tagList
    if (tagList.value.some(ele => diff(ele, data))) {
      return
    }
    // 推送到tagList列表
    tagList.value.push(data)
    // 保存tagList
    setStorage('tagList', tagList.value, 'localStorage')
  }


  /**
   * @description 删除tag
   * @param data 路由数据
   */
  const delTag = (data: Tag) => {
    // 删除匹配
    tagList.value = tagList.value.filter(ele => !diff(ele, data))
    // 保存tagList
    setStorage('tagList', tagList.value, 'localStorage')
  }

  /**
   * @description 删除所有tag
   */
  const delAllTag = () => {
    // 保留首页tag
    tagList.value = [homeTag]
    // 保存tagList
    setStorage('tagList', tagList.value, 'localStorage')
  }

  /**
   * @description 删除其他tag
   */
  const delOtherTag = (data: Tag) => {
    // 保留匹配和首页
    tagList.value = tagList.value.filter(ele => {
      // 首页
      if (ele.value === config.homePath) {
        return true
      }
      if (ele.value === data.value) {
        return true
      }
    })
    // 保存tagList
    setStorage('tagList', tagList.value, 'localStorage')
  }

  return {
    tagList,
    tag,
    tagsKeep,
    setTag,
    addTag,
    delTag,
    delAllTag,
    delOtherTag
  }
})
