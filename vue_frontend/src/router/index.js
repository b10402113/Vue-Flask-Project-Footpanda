import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

import MainLayout from '../views/layouts/MainLayout.vue'
import Store from '../views/Store.vue'
import Delivery from '../views/Delivery.vue'

const routes = [
    {
        path: '/',
        redirect: '/home/index'
    },
    {
        path: '/home',
        name: 'mainLayout',
        component: MainLayout,
        children: [
            {
                path: 'index',
                component: Home
            },
            {
                path: 'about',
                components: {
                    // 上面的另外一种写法，这样可以在一个组建中嵌入多个路由(router-view)
                    default: () => import('../views/About.vue')
                },
            },
            {
                path: 'login',
                components: {
                    // 上面的另外一种写法，这样可以在一个组建中嵌入多个路由(router-view)
                    default: () => import('../views/Login.vue')
                },
            },
            {
                path: 'register',
                components: {
                    // 上面的另外一种写法，这样可以在一个组建中嵌入多个路由(router-view)
                    default: () => import('../views/Register.vue')
                },
            },
            {
                path: 'mall',
                components: {
                    // 上面的另外一种写法，这样可以在一个组建中嵌入多个路由(router-view)
                    default: () => import('../views/Mall.vue')
                },
            },
            {
                path: 'mall/:id',
                components: {
                    // 上面的另外一种写法，这样可以在一个组建中嵌入多个路由(router-view)
                    default: () => import('../views/MallProduct.vue')
                },
            },
            {
                path: 'customer',
                components: {
                    // 上面的另外一种写法，这样可以在一个组建中嵌入多个路由(router-view)
                    default: () => import('../views/Customer.vue')
                },
            }
        ]
    },
    {
        path: '/store',

        component: MainLayout,
        children: [
            {
                path: '',
                component:Store,
                name:'homeStore'
            },
        ]
    },
    {
        path: '/delivery',

        component: MainLayout,
        children: [
            {
                path: '',
                component:Delivery,
                name:'deliver'
            },
        ]
    }

    // {
    //     path: '/about',
    //     name: 'about',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = new VueRouter({
    routes
})

export default router
