import { ActionTree, ActionContext } from 'vuex'
import RootState from './state'
import { types } from './mutations'

import { eth_to_allowance, eth_to_data } from '@/lib'

type Context = ActionContext<RootState, RootState>

async function update(ctx: Context, eth_address?: string) {
  if (eth_address !== undefined) {
    ctx.commit(types.ETH_ADDRESS_UPDATE, eth_address)
  }

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

export default <ActionTree<RootState, RootState>>{
  update,
}
