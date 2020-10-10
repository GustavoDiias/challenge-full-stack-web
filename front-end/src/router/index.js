import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'
import Students from '../components/students/Students.vue'
import Forms from '../components/students/Forms.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/students', component: Students },
    { path: '/forms', component: Forms },
  ]
})

