import { createRouter, createWebHistory } from 'vue-router'

const LayoutView = () => import("@/views/LayoutView.vue")
const NotFound = () => import("@/views/NotFound.vue")

const FileListView = () => import("@/views/FileListView.vue")

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/files',
      component: LayoutView,
      children: [
        {
          path: 'files/:path*',
          name: 'files',
          component: FileListView
        },
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

export default router
