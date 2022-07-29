import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import { routesWithLayouts } from './store'
import '@unocss/reset/tailwind.css'
import 'uno.css'

export const createApp = ViteSSG(
    App,
    {
        routes: routesWithLayouts,
        base: import.meta.env.BASE_URL,
    },
    ({ app }) => {
        const pinia = createPinia()
        app.use(pinia)
    },
)
