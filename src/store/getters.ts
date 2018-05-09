import State from './state'
import { GetterTree } from 'vuex'

import { eth_to_btc, eth_to_data } from '@/lib'

export default <GetterTree<State, any>>{
  btc_address: (state) => {
    if (state.eth_address_valid !== true) {
      return null
    }

    return eth_to_btc(state.eth_address)
  },

  allowance_decimal: (state) => {
    return state.allowance === null ? null : state.allowance.shiftedBy(-8).toFixed(8)
  }
}
