import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Predict from '../views/Predict.vue'
import Home from '../views/Home.vue'
import Personal from '../views/Personal.vue'
import Consultation from '../views/Consultation.vue'
import Exchange from '../views/Exchange.vue'
import Faq from '../views/Faq.vue'
import About from '../views/About.vue'
import Ai from '../views/Ai.vue'
import PredictResult from '../views/PredictResult.vue'
import Test from '../views/test.vue'

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
  },
  {
    path: '/personal-center',
    name: 'personal',
    component: Personal
  },
  {
    path: '/online-consultation',
    name: 'consultation',
    component: Consultation
  },
  {
    path: '/diaease-exchange',
    name: 'exchange',
    component: Exchange
  },
  {
    path: '/faq',
    name: 'faq',
    component: Faq
  },
  {
    path: '/about-us',
    name: 'about',
    component: About
  },
  {
    path: '/ai',
    name: 'ai',
    component: Ai
  },
  {
    path: '/predict-result',
    name: 'predict-result',
    component: PredictResult
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
