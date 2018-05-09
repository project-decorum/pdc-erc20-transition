import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import State from './state'
import mutations from './mutations'
import getters from './getters'


export default new Vuex.Store<State>({
  strict: true,

  state: new State(),
  mutations: mutations,
  getters: getters,
})
