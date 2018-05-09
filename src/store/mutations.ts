import State from './state'
import { MutationTree } from 'vuex'

import { eth_validate } from '@/lib'

export const types = {
  ETH_ADDRESS_UPDATE: 'ETH_ADDRESS_UPDATE',

  ALLOWANCE_UPDATE: 'ALLOWANCE_UPDATE',
}


export default <MutationTree<State>>{
  [types.ETH_ADDRESS_UPDATE](state, addr) {
    state.eth_address = addr
    state.eth_address_valid = addr === '' ? null : eth_validate(addr)
  },

  [types.ALLOWANCE_UPDATE](state, allowance) {
    state.allowance = allowance
  },
}
