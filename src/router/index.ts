import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import OrdersPage from '@/pages/OrdersPage.vue'
import VerifyPage from '@/pages/VerifyPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage,
  },
  {
    path: '/verify',
    name: 'verify',
    component: VerifyPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
