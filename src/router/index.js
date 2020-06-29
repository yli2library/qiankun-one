import Vue from 'vue'
import OneHome from '../views/index.vue'

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: OneHome
  },
  {
    path: '/list',
    name: 'List',
    component: () => import('../views/list.vue')
  }
]

export default routes
