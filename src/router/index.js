import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import { useUserStore } from '@/stores/user.js'

function routeGuard (to, from, next) {
  const { userInfo } = useUserStore()

  if (!userInfo && to.name !== routeNames.login) {
    next({name: routeNames.login})
  } else {
    next()
  }
}

export const routeNames = {
  login: 'login',
  todo: 'todo'
}

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: routeNames.login }
    },
    {
      path: '/',
      name: routeNames.login,
      component: Login
    },
    {
      path: '/todo',
      name: routeNames.todo,
      // route level code-splitting
      // this generates a separate chunk for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/Todo.vue')
    }
  ]
})

router.beforeEach(routeGuard)

