import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,

  state: {
    eth_address: '',
    eth_address_valid: null,
    btc_address: null,
  },

  mutations: {
    ETH_ADDRESS_UPDATE(state, addr) {
      state.eth_address = addr
    },
    ETH_ADDRESS_VALID_UPDATE(state, valid) {
      state.eth_address_valid = valid
    },
    BTC_ADDRESS_UPDATE(state, addr) {
      state.btc_address = addr
    },
  },

  actions: {

  }
})
