import State from './state'
import { MutationTree } from 'vuex'

import { BigNumber } from 'bignumber.js'
import { eth_validate } from '@/lib'
import { AddressTransaction } from './state'

export const types = {
  ETH_ADDRESS_UPDATE: 'ETH_ADDRESS_UPDATE',

  CONTRACT_DATA_PENDING: 'CONTRACT_DATA_PENDING',
  CONTRACT_DATA_FULFILLED: 'CONTRACT_DATA_FULFILLED',

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


  [types.CONTRACT_DATA_PENDING](state) {
    state.contractDataPending = true
    state.allowance = null
    state.balance = null
  },

  [types.CONTRACT_DATA_FULFILLED](state, [allowance, balance]: [BigNumber | null, BigNumber | null]) {
    state.contractDataPending = false
    state.allowance = allowance
    state.balance = balance
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

  [types.BURN_TX_FULFILLED](state, burnAddressTx: AddressTransaction[] | null) {
    state.burnAddressTxPending = false
    state.burnAddressTx = burnAddressTx
  },
}
