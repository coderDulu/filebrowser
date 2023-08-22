import { createRouter, createWebHistory, onBeforeRouteLeave } from 'vue-router'

const LayoutView = () => import('@/views/LayoutView.vue')
const NotFound = () => import('@/views/NotFound.vue')

const FileListView = () => import('@/views/FileListView.vue')
const LoginView = () => import('@/views/LoginView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      redirect: '/home/files',
      component: LayoutView,
      children: [
        {
          path: 'files/:path*',
          name: 'files',
          component: FileListView
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

router.beforeEach((to) => {
  const isLogin = localStorage.getItem('token')

  // 未登录且不去login页面
  if (!isLogin && to.name !== 'login') {
    return { name: 'login' }
  }
})
export default router
