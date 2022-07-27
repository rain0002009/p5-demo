import P5 from 'p5'
import { onMounted, ref } from 'vue'

export function useP5<T extends (sk: P5) => any> (start: T) {
    const el = ref<HTMLElement>()
    const sk = ref<P5>()
    const callbackValue = ref<ReturnType<typeof start>>({} as any)
    onMounted(() => {
        return new P5((sketch) => {
            sk.value = sketch
            callbackValue.value = start?.(sketch)
        }, el.value)
    })
    return {
        sk,
        el,
        callbackValue,
    }
}
