import State from './state'
import { MutationTree } from 'vuex'

export const types = {
  ETH_ADDRESS_UPDATE: 'ETH_ADDRESS_UPDATE',
  ETH_ADDRESS_VALID_UPDATE: 'ETH_ADDRESS_VALID_UPDATE',

  BTC_ADDRESS_UPDATE: 'BTC_ADDRESS_UPDATE',

  ALLOWANCE_UPDATE: 'ALLOWANCE_UPDATE',
}


export default <MutationTree<State>>{
  [types.ETH_ADDRESS_UPDATE](state, addr) {
    state.eth_address = addr
  },

  [types.ETH_ADDRESS_VALID_UPDATE](state, valid) {
    state.eth_address_valid = valid
  },

  [types.BTC_ADDRESS_UPDATE](state, addr) {
    state.btc_address = addr
  },

  [types.ALLOWANCE_UPDATE](state, allowance) {
    state.allowance = allowance
  },
}
