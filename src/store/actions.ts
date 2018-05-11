import { ActionTree, ActionContext } from 'vuex'
import RootState from './state'
import { types } from './mutations'

import { eth_to_allowance, eth_to_data, eth_to_balance, get_pdc_tx } from '@/lib'

type Context = ActionContext<RootState, RootState>

async function updateContractData(ctx: Context, eth_address?: string) {
  if (ctx.state.eth_address_valid !== true) {
    ctx.commit(types.CONTRACT_DATA_PENDING, [null, null])

    return
  }

  ctx.commit(types.CONTRACT_DATA_PENDING)

  const [allowance, balance] = await Promise.all([
    eth_to_allowance(ctx.state.eth_address),
    eth_to_balance(ctx.state.eth_address)
  ])

  ctx.commit(types.CONTRACT_DATA_FULFILLED, [allowance, balance])
}

async function updateTxData(ctx: Context, eth_address?: string) {
  if (ctx.state.eth_address_valid !== true || ctx.state.allowance === null) {
    ctx.commit(types.TX_DATA_FULFILLED, null)

    return
  }

  ctx.commit(types.TX_DATA_PENDING)

  const tx_data = await eth_to_data(ctx.state.eth_address, ctx.state.allowance)

  ctx.commit(types.TX_DATA_FULFILLED, tx_data)
}

async function updateBurnTx(ctx: Context) {
  if (ctx.state.eth_address_valid !== true) {
    ctx.commit(types.BURN_TX_FULFILLED, null)

    return
  }

  ctx.commit(types.BURN_TX_PENDING)

  const transactions = await get_pdc_tx(ctx.getters.btc_address)

  ctx.commit(types.BURN_TX_FULFILLED, transactions)
}

export default <ActionTree<RootState, RootState>>{
  updateContractData,
  updateTxData,
  updateBurnTx,
}
