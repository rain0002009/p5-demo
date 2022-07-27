<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useMainStore } from '../store'

const router = useRouter()
const route = useRoute()
const { routes } = useMainStore()
const menuItems = computed(() => {
    return routes
        .filter((item) => {
            return item.meta?.nav
        })
        .sort((a, b) => {
            return (a.meta?.nav?.index || 0) - (b.meta?.nav?.index || 0)
        })
})

const selectedKeys = computed(() => {
    return [route.path]
})

function jumpTo ({ key }: { key: any }) {
    router.push(key)
}
</script>

<template>
  <AMenu
    v-model:selectedKeys="selectedKeys"
    @click="jumpTo"
  >
    <AMenuItem v-for="item in menuItems" :key="`/${item.name}`">
      {{ item.name }}
    </AMenuItem>
  </AMenu>
</template>
