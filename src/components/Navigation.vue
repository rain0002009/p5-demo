<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const selectedKeys = computed(() => {
    return [route.path]
})
</script>

<template>
  <AMenu
    v-model:selectedKeys="selectedKeys"
    @click="({ key }) => {
      router.push(key)
    }"
  >
    <AMenuItem key="/wave-function">
      wave-function
    </AMenuItem>
  </AMenu>
</template>
