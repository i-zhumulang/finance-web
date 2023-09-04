import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouterOptions } from 'vue-router'
import { useUser } from "@/stores/Auth/User";

const routes: RouteRecordRaw[] = <RouteRecordRaw[]>[
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Auth/LoginView.vue')
  },
  {
    path: "/",
    name: "System",
    meta: {title: '首页', noCache: true},
    component: () => import('@/views/Common/Container/ContainerView.vue'),
    children: [
      {
        path: "index",
        name: 'Index',
        component: () => import('@/views/Index/IndexView.vue')
      },
      {
        path: "family-user",
        name: 'FamilyUser',
        component: () => import('@/views/FamilyUser/IndexView.vue')
      },
      {
        path: "family-invite",
        name: 'FamilyInvite',
        component: () => import('@/views/FamilyInvite/IndexView.vue')
      },
      {
        path: "category",
        name: 'Category',
        component: () => import('@/views/Category/IndexView.vue')
      },
      {
        path: "payment-method",
        name: 'PaymentMethod',
        component: () => import('@/views/PaymentMethod/IndexView.vue')
      },
      {
        path: "payment-account",
        name: 'PaymentAccount',
        component: () => import('@/views/PaymentAccount/IndexView.vue')
      },
      {
        path: "financial-statement",
        name: 'FinancialStatement',
        component: () => import('@/views/FinancialStatement/IndexView.vue')
      },
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/Common/Error/404.vue')
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/Common/Error/404.vue')
  },
]

const options: RouterOptions = <RouterOptions>{
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
}

const router = createRouter(options)

// 挂载路由导航守卫
// to 将要访问的路径
// from 代表从那个路径跳转而来
// next next()放行,next('/login')表示跳转
const login = '/login';
router.beforeEach((to, from, next) => {
  if (to.path === login) {
    return next();
  }
  // 获取token
  const userStore = useUser();
  // 判断token是否不为空
  if (!userStore.token) {
    return next(login);
  }
  return next();
})

export default router
