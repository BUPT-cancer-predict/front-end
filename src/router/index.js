import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Predict from '../views/Predict.vue'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
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
