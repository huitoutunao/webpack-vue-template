import Vue from 'vue'
import { Button } from 'vant'
import App from './App'
import router from './router'
import store from './store'

Vue.use(Button)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
