import P5 from 'p5'
import { onMounted, ref } from 'vue'

export function useP5 (start?: (sk: P5) => void) {
    const el = ref<HTMLElement>()
    const sk = ref<P5>()
    onMounted(() => {
        return new P5((sketch) => {
            sk.value = sketch
            start?.(sketch)
        }, el.value)
    })
    return {
        sk,
        el,
    }
}
