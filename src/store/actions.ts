import { ActionTree, ActionContext } from 'vuex'
import RootState from './state'
import { types } from './mutations'

import { eth_to_allowance, eth_to_data, eth_to_balance } from '@/lib'
import axios from 'axios'

type Context = ActionContext<RootState, RootState>

async function update(ctx: Context, eth_address?: string) {
  if (eth_address !== undefined) {
    ctx.commit(types.ETH_ADDRESS_UPDATE, eth_address)
  }

  // Update the burn address tx count too.
  ctx.dispatch('updateBurnTx')
  ctx.dispatch('updateBalance')

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

  const response = await axios.post(
    'https://api.omniexplorer.info/v1/transaction/address/0',
    'addr=' + ctx.getters.btc_address
  )

  // Filter out any other transactions
  const transactions = (<any[]>response.data.transactions).filter(t => t.propertyid === 59 && t.type_int === 0 && t.referenceaddress === ctx.getters.btc_address)

  ctx.commit(types.BURN_TX_FULFILLED, transactions)
}

async function updateBalance(ctx: Context) {
  if (ctx.state.eth_address_valid !== true) {
    ctx.commit(types.BALANCE_FULFILLED, null)

    return
  }

  ctx.commit(types.BALANCE_PENDING)

  const balance = await eth_to_balance(ctx.state.eth_address)

  ctx.commit(types.BALANCE_FULFILLED, balance)
}

export default <ActionTree<RootState, RootState>>{
  update,
  updateBurnTx,
  updateBalance,
}
