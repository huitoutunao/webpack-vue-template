import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: Index,
  meta: {
      title: '首页'
  }
}, {
  path: '/about',
  name: 'about',
  component: () => import(/* webpackChunkName: "about" */ '@/views/About'),
  meta: {
      title: '关于'
  }
}, {
  path: '/detail',
  name: 'detail',
  component: () => import(/* webpackChunkName: "detail" */ '@/views/Detail'),
  meta: {
      title: '详情'
  }
}]

const router = new VueRouter({
  routes
})

export default router
