import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import routes from '~pages'
import 'uno.css'

const router = createRouter({
    history: createWebHistory('/p5-demo/'),
    routes: setupLayouts(routes),
})
const app = createApp(App)
app.use(router)
app.mount('#app')
