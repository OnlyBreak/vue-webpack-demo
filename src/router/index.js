import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Login from '../components/auth/login.vue'
import TodoList from '../components/TodoList.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/todolist',
    component: TodoList
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

export default new Router({
  mode: 'history',
  routes
})
