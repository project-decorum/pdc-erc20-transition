import { BigNumber } from 'bignumber.js'

export default class State {
  eth_address: string = ''
  eth_address_valid: boolean | null = null

  allowance: BigNumber | null = null
  allowancePending: boolean = false

  txData: string | null = null
  txDataPending: boolean = false
}
