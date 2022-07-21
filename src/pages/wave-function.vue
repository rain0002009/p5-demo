<script lang="ts" setup>
import { unref } from 'vue'
import { useP5 } from '../lib/useP5'
import { drawWithWaveFunctionCollapse } from '../lib/WaveFunctionCollapse'

const imageUrls = new Array(13).fill(0).map((_i, index) => {
    return new URL(`../assets/circuit-coding-train/${index}.png`, import.meta.url).href
})

const { el } = useP5((sk) => {
    const dom = unref(el)
    drawWithWaveFunctionCollapse(sk, imageUrls, [
        [['AAA', 'AAA', 'AAA', 'AAA'], [1, 2, 3]], // 0
        [['BBB', 'BBB', 'BBB', 'BBB'], []], // 1
        [['BBB', 'BCB', 'BBB', 'BBB'], [1, 2, 3]], // 2
        [['BBB', 'BDB', 'BBB', 'BDB'], [1]], // 3
        [['ABB', 'BCB', 'BBA', 'AAA'], [1, 2, 3]], // 4
        [['ABB', 'BBB', 'BBB', 'BBA'], [1, 2, 3]], // 5
        [['BBB', 'BCB', 'BBB', 'BCB'], [1]], // 6
        [['BDB', 'BCB', 'BDB', 'BCB'], [1]], // 7
        [['BDB', 'BBB', 'BCB', 'BBB'], [1, 2, 3]], // 8
        [['BCB', 'BCB', 'BBB', 'BCB'], [1, 2, 3]], // 9
        [['BCB', 'BCB', 'BCB', 'BCB'], [1]], // 10
        [['BCB', 'BBB', 'BBB', 'BCB'], [1, 2, 3]], // 11
        [['BBB', 'BCB', 'BBB', 'BCB'], [1]], // 12
    ], dom, 10)
})
</script>

<template>
  <div class="p-5 h-full">
    <div ref="el" class="w-full h-full" />
  </div>
</template>

<style scoped>

</style>
