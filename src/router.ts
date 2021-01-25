
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
  }, {
    path: '/editor',
    name: 'editor',
    component: () => import('./views/editor/index.vue')
  }, {
    path: '/todo',
    name: 'todoTest',
    component: () => import('./views/TodoTest')
    }, {
      path: '/print',
      name: 'printEditor',
      component: () => import('./views/print-editor/index.vue')
  }]
})