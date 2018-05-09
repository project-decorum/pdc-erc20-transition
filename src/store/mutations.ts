import State from './state'
import { MutationTree } from 'vuex'

import { BigNumber } from 'bignumber.js'
import { eth_validate } from '@/lib'

export const types = {
  ETH_ADDRESS_UPDATE: 'ETH_ADDRESS_UPDATE',

  ALLOWANCE_PENDING: 'ALLOWANCE_PENDING',
  ALLOWANCE_FULFILLED: 'ALLOWANCE_FULFILLED',

  TX_DATA_PENDING: 'TX_DATA_PENDING',
  TX_DATA_FULFILLED: 'TX_DATA_FULFILLED',

  BURN_TX_PENDING: 'BURN_TX_PENDING',
  BURN_TX_FULFILLED: 'BURN_TX_FULFILLED',
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

  [types.ALLOWANCE_FULFILLED](state, allowance: BigNumber | null) {
    state.allowancePending = false
    state.allowance = allowance
  },

  [types.TX_DATA_PENDING](state) {
    state.txDataPending = true
    state.txData = null
  },

  [types.TX_DATA_FULFILLED](state, txData: string | null) {
    state.txDataPending = false
    state.txData = txData
  },

  [types.BURN_TX_PENDING](state) {
    state.burnAddressTxPending = true
    state.burnAddressTx = null
  },

  [types.BURN_TX_FULFILLED](state, burnAddressTx: number | null) {
    state.burnAddressTxPending = false
    state.burnAddressTx = burnAddressTx
  },
}
