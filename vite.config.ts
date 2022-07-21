import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/p5-demo/',
    plugins: [
        vue(),
        Unocss(),
        Components({
            resolvers: [AntDesignVueResolver()],
        }),
        Pages({
            exclude: ['**/components/*.vue'],
        }),
        Layouts(),
    ],
})
