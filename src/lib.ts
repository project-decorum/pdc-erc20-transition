import bitcore from 'bitcore-lib'
import * as Web3 from 'web3'
import * as abi from './abi.json'
import { BigNumber } from 'bignumber.js'

const address_contract = '0x69fb16008FA5851E6fec3193d45Daf6792ef0A5E'
const address_from = '0x4b86dEc5798e095F957Bd17a7AfDa53f7118318f'

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/mew'))
// const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:8545'))
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
  const balanceOf = contract.methods.allowance(address_from, eth_address_str)
  const allowance = new BigNumber(await balanceOf.call())

  return allowance.shiftedBy(-8).toString()
}

export async function eth_to_data(eth_address_str: string) {
  const balanceOf = contract.methods.allowance(address_from, eth_address_str)
  const allowance = new BigNumber(await balanceOf.call())

  const transferFrom = contract.methods.transferFrom(address_from, eth_address_str, allowance.toString())
  const abi = await transferFrom.encodeABI()

  return abi
}



// contract.getPastEvents('Approval', {
//   fromBlock: 3000000,
//   // toBlock: 'latest',
//   filter: { owner: '0x4b86dec5798e095f957bd17a7afda53f7118318f' }
// }).then(console.log)
