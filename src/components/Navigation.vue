<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

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
    <AMenuItem key="/wave-function">
      wave-function
    </AMenuItem>
  </AMenu>
</template>
