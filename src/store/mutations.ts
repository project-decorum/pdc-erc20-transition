import State from './state'
import { MutationTree } from 'vuex'

import { eth_validate } from '@/lib'

export const types = {
  ETH_ADDRESS_UPDATE: 'ETH_ADDRESS_UPDATE',

  ALLOWANCE_PENDING: 'ALLOWANCE_PENDING',
  ALLOWANCE_FULFILLED: 'ALLOWANCE_FULFILLED',
}


export default <MutationTree<State>>{
  [types.ETH_ADDRESS_UPDATE](state, addr) {
    state.eth_address = addr
    state.eth_address_valid = addr === '' ? null : eth_validate(addr)
  },

  [types.ALLOWANCE_PENDING](state) {
    state.allowancePending = true
    state.allowance = null
  },

  [types.ALLOWANCE_FULFILLED](state, allowance) {
    state.allowancePending = false
    state.allowance = allowance
  },
}
