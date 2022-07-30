<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useMainStore } from '../store'
import { vRotate } from '../lib/directive/vRotate'

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
        .map((item) => {
            return {
                ...item,
                name: item.name as string,
            }
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
    v-rotate.parent="'li'"
    class="bg-transparent pt-40px space-y-30px"
    @click="jumpTo"
  >
    <AMenuItem
      v-for="item in menuItems"
      :key="`/${item.name}`"
      class="bg-white m-4 rounded-4px"
    >
      {{ item.name }}
    </AMenuItem>
  </AMenu>
</template>
