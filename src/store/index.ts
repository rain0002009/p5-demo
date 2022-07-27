import { setupLayouts } from 'virtual:generated-layouts'
import { defineStore } from 'pinia'
import routes from '~pages'

export const routesWithLayouts = setupLayouts(routes)

export const useMainStore = defineStore('main', {
    state () {
        return {
            routes,
        }
    },
})
