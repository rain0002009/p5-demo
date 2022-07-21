<script lang="ts" setup>
import Navigation from '../components/Navigation.vue'
</script>

<template>
  <ALayout class="h-full">
    <ALayoutSider>
      <Navigation />
    </ALayoutSider>
    <ALayout>
      <RouterView />
    </ALayout>
  </ALayout>
</template>
