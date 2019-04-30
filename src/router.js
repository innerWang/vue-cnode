import Vue from 'vue'
import Router from 'vue-router'
import ArticleList from './components/Articlelist'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'root',
      components: {
        main: ArticleList
      }
    },
    {
      path: '/topic/:id&author=:name',
      name: 'get_content',
      // 路由懒加载
      // 使用箭头函数指向import函数，Vue将会在需要该组件的时候才执行请求加载该组件的代码。
      components: {
        main: () => import(/* webpackChunkName: "about" */ './components/ArticleDetail.vue'),
        slidebar:() => import(/* webpackChunkName: "about" */ './components/SlideBar.vue')
      }
    },
    {
      path: '/userinfo/:name',
      name: 'userinfo',
      // 路由懒加载
      // 使用箭头函数指向import函数，Vue将会在需要该组件的时候才执行请求加载该组件的代码。
      components: {
        main: () => import(/* webpackChunkName: "about" */ './components/Userinfo.vue')
      }
    }
  ]
})
