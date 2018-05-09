import State from './state'
import { GetterTree } from 'vuex'

import bitcore from 'bitcore-lib'
import * as Web3 from 'web3'

export default <GetterTree<State, any>>{
  btc_address: (state) => {
    if (state.eth_address_valid !== true) {
      return null
    }

    const eth_address_str = Web3.utils.toChecksumAddress(state.eth_address)

    const eth_address_buf = Buffer.from(eth_address_str.substring(2), 'hex')
    const eth_address_adr = bitcore.Address.fromPublicKeyHash(eth_address_buf)

    return eth_address_adr.toString()
  },
}
