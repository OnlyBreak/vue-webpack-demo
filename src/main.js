import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.prototype.$http = Axios
Vue.use(Element)

router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem('demo-token')

  if (to.path === '/') {
    if (token !== null) {
      next('/hello')
    }
    next()
  } else {
    if (token != null) {
      Vue.prototype.$http.defaults.headers.common['Authorization'] = 'Bearer ' + token; // 全局设定header的token验证，注意Bearer后有个空格
      next()
    } else {
      next('/')
    }
  }
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
