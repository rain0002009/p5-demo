import '@vue/runtime-core'
import type { defineComponent } from 'vue'

export {}

declare module '@vue/runtime-core' {
    export interface GlobalComponents {
        route: defineComponent
    }
}
