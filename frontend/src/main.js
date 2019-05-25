import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'

Vue.config.productionTip = false
// let serverLocation = 'http://localhost'
let serverLocation = 'http://fastma.io'
Vue.prototype.userServer = serverLocation + ':8801'
Vue.prototype.fundServer = serverLocation + ':8802'
Vue.prototype.gameServer = serverLocation + ':8803'
Vue.prototype.eventBus = new Vue()

new Vue({
  render: h => h(App),
}).$mount('#app')
