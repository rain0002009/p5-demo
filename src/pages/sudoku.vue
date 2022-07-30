<script lang="ts" setup>
import { useHead } from '@vueuse/head'
import { useP5 } from '../lib/useP5'
import { drawSudoku } from '../lib/Sudoku'

const { el, callbackValue } = useP5(drawSudoku)
useHead({
    title: 'sudoku',
})
</script>

<template>
  <div class="bg-white flex flex-col h-full m-4">
    <div class="mb-4 text-center mt-20 space-x-6">
      <AButton type="primary" @click.stop="callbackValue.handleStart">
        开始
      </AButton>
      <AButton danger @click.stop="callbackValue.handleReset">
        重置
      </AButton>
    </div>
    <div ref="el" class="mx-auto" />
  </div>
</template>

<route lang="yaml">
meta:
  nav:
    index: 1
</route>
