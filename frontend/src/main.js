import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

Vue.config.productionTip = false
// let serverLocation = 'http://localhost'
let serverLocation = 'http://45.32.135.124'
Vue.prototype.userServer = serverLocation + ':8801'
Vue.prototype.fundServer = serverLocation + ':8802'

new Vue({
  render: h => h(App),
}).$mount('#app')
