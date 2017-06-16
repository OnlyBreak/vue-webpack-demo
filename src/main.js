import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.prototype.$http = Axios
Vue.use(Element)

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})
