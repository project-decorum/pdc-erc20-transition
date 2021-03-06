import Vue from 'vue'
import Router from 'vue-router'
import S1 from './views/S1.vue'
import S2 from './views/S2.vue'
import S3 from './views/S3.vue'
import S4 from './views/S4.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/1' },
    { path: '/1', name: '1', component: S1 },
    { path: '/2', name: '2', component: S2 },
    { path: '/3', name: '3', component: S3 },
    { path: '/4', name: '4', component: S4 },
  ]
})
