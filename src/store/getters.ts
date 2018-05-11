import State from './state'
import { GetterTree } from 'vuex'

import { BigNumber } from 'bignumber.js'
import { eth_to_btc, eth_to_data } from '@/lib'

export default <GetterTree<State, any>>{
  btc_address: (state) => {
    if (state.eth_address_valid !== true) {
      return null
    }

    return eth_to_btc(state.eth_address)
  },

  allowance_decimal: (state) => {
    return state.allowance === null ? null : state.allowance.shiftedBy(-8)
  },

  balance_decimal: (state) => {
    return state.balance === null ? null : state.balance.shiftedBy(-8)
  },

  burned: (state) => {
    if (state.burnAddressTx === null) {
      return null
    }

    const amounts = state.burnAddressTx
      .filter(t => t.confirmations > 0) // Only count confirmed transactions
      .map(t => new BigNumber(t.amount))

    return amounts.reduce((s, t) => s.plus(t), new BigNumber(0))
  },

  step: (state, getters) => {
    // Fill in a valid Ethereum address
    if (state.eth_address_valid !== true) {
      return 1
    }

    // Burn some coins
    if (state.burnAddressTx === null || getters.burned.isZero()) {
      return 2
    }

    // Wait for approval when no allowance and balance
    if (state.allowance === null || state.balance === null || (state.allowance.isZero() && state.balance.isZero())) {
      return 3
    }

    // allowance + balance != burned ---> wait for approval
    if (!getters.allowance_decimal.plus(getters.balance_decimal).isEqualTo(getters.burned)) {
      return 3
    }

    // Claim the ERC20
    if (!state.balance.isEqualTo(getters.burned)) {
      return 4
    }

    return 5
  },
}
