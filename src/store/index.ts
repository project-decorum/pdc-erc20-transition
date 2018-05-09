import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import State from './state'
import mutations from './mutations'


export default new Vuex.Store<State>({
  strict: true,

  state: new State(),
  mutations: mutations,
})
