<script lang="ts" setup>
import { useP5 } from '../lib/useP5'
import { P5TextInput } from '../lib/TextInput'

const { el } = useP5((sk) => {
    let textInput: P5TextInput
    sk.setup = () => {
        const canvas = sk.createCanvas(500, 500)
        textInput = new P5TextInput(sk, canvas.position())
        textInput.active()
    }

    sk.draw = () => {
        sk.clear(0, 0, 0, 0)
        sk.background(255)
        textInput.draw()
    }

    sk.mouseClicked = () => {
        textInput.handleClick()
    }
})
</script>

<template>
  <div class="p-5 h-full">
    <div ref="el" class="w-full h-full" />
  </div>
</template>

<route lang="yaml">
meta:
  nav:
    index: 2
</route>
