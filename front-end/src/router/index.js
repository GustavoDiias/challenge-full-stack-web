import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Forms from '../components/Forms.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/forms', component: Forms },
  ]
})

