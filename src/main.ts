// toString should output decimal instead of exponential notation.
import { BigNumber } from 'bignumber.js'
BigNumber.config({ EXPONENTIAL_AT: [-10, 20] })

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './main.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
