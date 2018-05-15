import { ActionTree, ActionContext } from 'vuex'
import RootState from './state'
import { types } from './mutations'

import { eth_to_allowance, eth_to_data, eth_to_balance, get_pdc_tx, get_paused } from '@/lib'

type Context = ActionContext<RootState, RootState>

async function updateContractData(ctx: Context, eth_address?: string) {
  if (ctx.state.contractDataPending) {
    return
  }

  if (ctx.state.eth_address_valid !== true) {
    ctx.commit(types.CONTRACT_DATA_FULFILLED, [null, null, null])

    return
  }

  ctx.commit(types.CONTRACT_DATA_PENDING)

  try {
    const [allowance, balance, paused] = await Promise.all([
      eth_to_allowance(ctx.state.eth_address),
      eth_to_balance(ctx.state.eth_address),
      get_paused()
    ])

    ctx.commit(types.CONTRACT_DATA_FULFILLED, [allowance, balance, paused])
  } catch (error) {
    console.error(error)
    ctx.commit(types.CONTRACT_DATA_FULFILLED, [null, null, null])
  }
}

async function updateTxData(ctx: Context, eth_address?: string) {
  if (ctx.state.txDataPending) {
    return
  }

  if (ctx.state.eth_address_valid !== true || ctx.state.allowance === null || ctx.state.allowance.isZero()) {
    ctx.commit(types.TX_DATA_FULFILLED, null)

    return
  }

  ctx.commit(types.TX_DATA_PENDING)

  try {
    const tx_data = await eth_to_data(ctx.state.eth_address, ctx.state.allowance)

    ctx.commit(types.TX_DATA_FULFILLED, tx_data)
  } catch (error) {
    console.error(error)
    ctx.commit(types.TX_DATA_FULFILLED, null)
  }
}

async function updateBurnTx(ctx: Context) {
  if (ctx.state.burnAddressTxPending) {
    return
  }

  if (ctx.state.eth_address_valid !== true) {
    ctx.commit(types.BURN_TX_FULFILLED, null)

    return
  }

  ctx.commit(types.BURN_TX_PENDING)

  try {
    const transactions = await get_pdc_tx(ctx.getters.btc_address)

    ctx.commit(types.BURN_TX_FULFILLED, transactions)
  } catch (error) {
    console.error(error)
    ctx.commit(types.BURN_TX_FULFILLED, null)
  }
}

export default <ActionTree<RootState, RootState>>{
  updateContractData,
  updateTxData,
  updateBurnTx,
}
