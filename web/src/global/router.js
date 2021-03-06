import Vue from 'vue'
import Router from 'vue-router'
import common from '../modules/common/router'
import publicRouter from '../modules/public/router'
import MainLayout from '../modules/common/view/MainLayout.vue'
import system from '../modules/system/router'
import baseData from '../modules/baseData/router'
import Page404 from '../modules/common/view/Page404.vue'

// 解决vue-router出现promise未捕获报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  routes: [
    ...publicRouter,
    {
      path: '/',
      component: MainLayout,
      children: [...common, ...system, ...baseData]
    },
    {
      path: '*',
      component: Page404
    }
  ]
})
// 路由改变的钩子
// router.beforeEach((to, from, next) => {
//   next()
// })
export default router
