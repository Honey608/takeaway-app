import Vue from 'vue'
import Router from 'vue-router'
import commoDity from './components/commodity/commodity'
import Comment from './components/comment/comment'
import Business from './components/business/business'
import Resource from 'vue-resource'

Vue.use(Router)
Vue.use(Resource)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'frist',
      component: commoDity
    },
    {
      path: '/commodity',
      name: 'commodity',
      component: commoDity
    },
    {
      path: '/comment',
      name: 'comment',
      component: Comment
    },
    {
      path: '/business',
      name: 'Business',
      component: Business
    }
  ]
})
