import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { userInfo } from './../assets/js/author.js';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "Detail" */ '../views/Detail.vue')
  },
  {
    path: '/order',
    name: 'Order',
    component: () => import(/* webpackChunkName: "Order" */ '../views/Order.vue')
  },
  {
    path: '/address',
    name: 'Address',
    component: () => import(/* webpackChunkName: "Address" */ '../views/Address.vue')
  },
  {
    path: '/found',
    name: 'Found',
    component: () => import(/* webpackChunkName: "Found" */ '../views/Found.vue')
  },
  {
    path: '/achieve',
    name: 'Achieve',
    component: () => import(/* webpackChunkName: "Achieve" */ '../views/Achieve.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to, from);
  userInfo().then(() => {
    next();
  })
})

export default router
