<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router';
import { useTagsStore } from '@/store';

const route = useRoute()
const tagsStore = useTagsStore()

const key = computed(() => route.path)
</script>

<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in" appear>
      <component
        :is="Component"
        v-if="route.meta.ignoreCache"
        :key="route.fullPath"
      />
      <keep-alive v-else :include="tagsStore.tagsKeep">
        <component :is="Component" :key="key" />
      </keep-alive>
    </transition>
  </router-view>
</template>
