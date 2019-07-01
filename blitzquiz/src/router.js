import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Permissions from '@/components/Permissions.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/permissions',
      name: 'Permissions',
      component: Permissions
    },
    {
      path: '/screener',
      name: 'screener',
      component: () => import("./components/Screener.vue")
    },
    {
      path: '/cms/:role',
      name: 'cms',
      component: () => import("./views/Cms.vue")
    },
    {
      path: '/category/:selectedCategory',
      name: 'category',
      component: () => import("./views/Category.vue")
    },
    {
      path:'/createquiz/:questionNo',
      name:'createquiz',
      component: () => import('./pages/createquiz.vue')
    },
    {
      path:'/contestCreated/:contestName/:category',
      name:'ContestCreated',
      component: () => import('./pages/ContestCreated.vue')
    },
    {
      path: '/contestCreate',
      name: 'contestCreate',
      component: () => import('./pages/ContestCreate.vue')
    },
    {
      path: '/quizWelcome',
      name: 'Quiz Welcome Page',
      component: () => import('./components/QuizWelcome.vue')
    },
    {
      path: '/quizPage',
      name: 'Quiz Page',
      component: () => import('./components/QuizPage.vue')
    },
    {
      path: '/QuizFinish',
      name: 'Quiz Finish Page',
      component: () => import('./components/QuizFinish.vue')
    },
    {
      path: '/view',
      name: 'All Contests',
      component: () => import('./components/Viewcontest.vue')
    }
  ]
})
