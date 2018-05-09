import { ActionTree, ActionContext } from 'vuex'
import RootState from './state'
import { types } from './mutations'

import { eth_to_allowance, eth_to_data } from '@/lib'
import axios from 'axios'

type Context = ActionContext<RootState, RootState>

async function update(ctx: Context, eth_address?: string) {
  if (eth_address !== undefined) {
    ctx.commit(types.ETH_ADDRESS_UPDATE, eth_address)
  }

  // Update the burn address tx count too.
  ctx.dispatch('updateBurnTx')

  if (ctx.state.eth_address_valid !== true) {
    ctx.commit(types.ALLOWANCE_FULFILLED, null)
    ctx.commit(types.TX_DATA_FULFILLED, null)

    return
  }

  ctx.commit(types.ALLOWANCE_PENDING)
  ctx.commit(types.TX_DATA_PENDING)

  const allowance = await eth_to_allowance(ctx.state.eth_address)

  ctx.commit(types.ALLOWANCE_FULFILLED, allowance)

  const tx_data = await eth_to_data(ctx.state.eth_address, allowance)

  ctx.commit(types.TX_DATA_FULFILLED, tx_data)
}

async function updateBurnTx(ctx: Context) {
  if (ctx.state.eth_address_valid !== true) {
    ctx.commit(types.BURN_TX_FULFILLED, null)

    return
  }

  ctx.commit(types.BURN_TX_PENDING)

  const response = await axios.get('https://api.blockcypher.com/v1/btc/main/addrs/' + ctx.getters.btc_address + '/balance', { params: { cors: true } })

  ctx.commit(types.BURN_TX_FULFILLED, response.data.n_tx)
}

export default <ActionTree<RootState, RootState>>{
  update,
  updateBurnTx,
}
