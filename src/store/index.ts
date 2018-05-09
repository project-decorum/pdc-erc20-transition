import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import State from './state'


export default new Vuex.Store<State>({
  strict: true,

  actions: actions,
  getters: getters,
  mutations: mutations,
  state: new State(),
})
