import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouterOptions } from 'vue-router'

const routes: RouteRecordRaw[] = <RouteRecordRaw[]>[
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/common/error/404.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/common/error/404.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/user/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/auth/LoginView.vue')
  },
  {
    path: '/module',
    name: 'Module',
    component: () => import('@/views/auth/ModuleView.vue')
  },
  {
    path: "/system",
    name: "System",
    meta: {title: '首页', noCache: true},
    component: () => import('@/views/common/container/ContainerView.vue'),
    children: [
      {
        path: "module/index",
        name: 'ModuleIndex',
        component: () => import('@/views/system/module/IndexView.vue')
      },
      {
        path: "menu/index",
        name: 'MenuIndex',
        component: () => import('@/views/system/menu/IndexView.vue')
      }
    ]
  },
]

const options: RouterOptions = <RouterOptions>{
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
}

const router = createRouter(options)

export default router
