import bitcore from 'bitcore-lib'
import * as Web3 from 'web3'
import * as abi from './abi.json'
import { BigNumber } from 'bignumber.js'
import axios from 'axios'


const address_contract = process.env.VUE_APP_PDC_CONTRACT_ADDR
const address_from = process.env.VUE_APP_PDC_CONTRACT_FROM

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.VUE_APP_ETH_RPC))
const contract = new web3.eth.Contract(abi, address_contract)

export function eth_to_btc(eth_address_str: string) {
  // Make sure address is in right format.
  eth_address_str = Web3.utils.toChecksumAddress(eth_address_str)

  const eth_address_buf = Buffer.from(eth_address_str.substring(2), 'hex')
  const eth_address_adr = bitcore.Address.fromPublicKeyHash(eth_address_buf)

  return eth_address_adr.toString()
}

export function eth_validate(eth_address_str: string) {
  return Web3.utils.isAddress(eth_address_str)
}
export function eth_to_checksum(eth_address_str: string) {
  return Web3.utils.toChecksumAddress(eth_address_str)
}

export async function eth_to_allowance(eth_address_str: string) {
  const allowanceTx = contract.methods.allowance(address_from, eth_address_str)
  const allowance = new BigNumber(await allowanceTx.call())

  return allowance
}

export async function eth_to_balance(eth_address_str: string) {
  const balanceOfTx = contract.methods.balanceOf( eth_address_str)
  const balanceOf = new BigNumber(await balanceOfTx.call())

  return balanceOf
}

export async function eth_to_data(eth_address_str: string, allowance: BigNumber) {
  const transferFrom = contract.methods.transferFrom(address_from, eth_address_str, allowance.toString())
  const abi = await transferFrom.encodeABI()

  return abi
}

export async function get_pdc_tx(btc_address: string) {
  const response = await axios.post(
    process.env.VUE_APP_OMNI_API + '/transaction/address/0',
    'addr=' + btc_address
  )

  // Filter out any other transactions
  const transactions = (<any[]>response.data.transactions).filter(t => t.propertyid === 59 && t.type_int === 0 && t.referenceaddress === btc_address)

  return transactions
}
