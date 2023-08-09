import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/diary',
      component: () => import('@/views/home/index.vue'),
      children: [
        {
          path: '/diary',
          name: 'diary',
          redirect: '/diary/hello',
          component: () => import('@/views/home/diary/index.vue'),
          children: [
            {
              path: '/diary/hello',
              name: 'hello',
              component: () => import('@/views/home/diary/Hello.vue'),
              meta: {
                parent: 'diary'
              }
            },
            {
              path: '/diary/room/:id',
              name: 'room',
              component: () => import('@/views/home/diary/Room.vue'),
              meta: {
                parent: 'diary'
              }
            }
          ]
        },
        {
          path: '/tools',
          name: 'tools',
          component: () => import('@/views/home/tools/index.vue')
        },
        {
          path: '/clound_data',
          name: 'cloundData',
          component: () => import('@/views/home/clound_data/index.vue')
        },
        {
          path: '/chatgpt',
          name: 'chatgpt',
          component: () => import('@/views/home/chatgpt/index.vue')
        },
        {
          path: '/music',
          name: 'music',
          component: () => import('@/views/home/music/index.vue')
        },
        {
          path: '/manager',
          name: 'manager',
          component: () => import('@/views/home/manager/index.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index.vue')
    },
    {
      path: '/regist',
      name: 'regist',
      component: () => import('@/views/regist/index.vue')
    }
  ]
})

export default router
