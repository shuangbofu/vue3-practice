
import { createRouter, createWebHashHistory, } from 'vue-router'
export const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: '/',
    name: 'home',
    redirect: { name: 'welcome' }
  }, {
    path: '/welcome',
    name: 'welcome',
    component: () => import('./views/Welcome')
  }]
})