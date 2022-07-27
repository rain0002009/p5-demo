import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import { createPinia } from 'pinia'
import App from './App.vue'
import 'uno.css'
import { routesWithLayouts } from './store'

const pinia = createPinia()

const router = createRouter({
    history: createWebHistory('/p5-demo/'),
    routes: routesWithLayouts,
})
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')
