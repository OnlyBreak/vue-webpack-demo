import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Login from '../components/auth/login.vue'
import TodoList from '../components/TodoList.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/todolist',
    component: TodoList
  },
  {
    path: '/hello',
    name: 'Hello',
    component: Hello
  },
]

export default new Router({
  mode: 'history',
  routes
})
