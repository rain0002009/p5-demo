import type P5 from 'p5'
import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useP5<T extends (sk: P5) => any> (start: T) {
    const el = ref<HTMLElement>()
    const sk = ref<P5>()
    const callbackValue = ref<ReturnType<typeof start>>({} as any)
    onMounted(async () => {
        const { default: P5JS } = await import('p5')
        return new P5JS((sketch) => {
            sk.value = sketch
            callbackValue.value = start?.(sketch)
        }, el.value)
    })
    onBeforeUnmount(() => {
        if (sk.value) {
            sk.value?.remove()
            sk.value = void 0
        }
    })
    return {
        sk,
        el,
        callbackValue,
    }
}
