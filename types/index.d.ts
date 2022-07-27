import 'vue-router'

declare module 'vue-router' {
    interface RouteMeta {
        /**
         * 是否在侧边栏导航显示
         */
        nav?: {
            /**
             * 排序
             */
            index: number
        }
    }
}
