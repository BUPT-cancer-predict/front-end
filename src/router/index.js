import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Test from '../views/test.vue'
import Predict from '../views/predict.vue'
import Home from '../views/home.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
  {
    path: '/predict',
    name: 'predict',
    component: Predict
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
