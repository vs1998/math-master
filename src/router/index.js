import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/solve-up',
    name: 'SolveUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SolveUp.vue')
  },
  {
    path: '/memory',
    name: 'Memory',
    component: () => import(/* webpackChunkName: "about" */ '../views/Memory.vue')
  },
  {
    path: '/memory-matrix',
    name: 'MemoryMatrix',
    component: () => import(/* webpackChunkName: "about" */ '../views/MemoryMatrix.vue')
  },
  {
    path: '/countdown-solver',
    name: 'CountdownSolver',
    component: () => import(/* webpackChunkName: "about" */ '../views/CountdownSolver.vue')
  },
  {
    path: '/sum-it-up',
    name: 'SumItUp',
    component: () => import(/* webpackChunkName: "about" */ '../views/SumItUp.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
