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
  },

  balance_decimal: (state) => {
    return state.balance === null ? null : state.balance.shiftedBy(-8).toFixed(8)
  },

  burned: (state) => {
    if (state.burnAddressTx === null) {
      return null
    }

    const amounts = state.burnAddressTx.map(t => Number(t.amount));
    return amounts.reduce((s, t) => s + t, 0)
  },

  step: (state) => {
    if (state.eth_address_valid !== true) {
      return 1
    }

    if (state.burnAddressTx === null || state.burnAddressTx.length === 0) {
      return 2
    }

    if (state.allowance === null || state.allowance.isZero()) {
      return 3
    }

    return 4
  },
}
