import { BigNumber } from 'bignumber.js'

export default class State {
  eth_address: string = ''
  eth_address_valid: boolean | null = null

  allowance: BigNumber | null = null
  balance: BigNumber | null = null
  contractDataPending: boolean = false

  txData: string | null = null
  txDataPending: boolean = false

  burnAddressTx: AddressTransaction[] | null = null
  burnAddressTxPending: boolean = false
}

export interface AddressTransaction {
  amount: string           // "108704"
  block: number            // 425888
  blockhash: string        // "0000000000000000041dea2a2bb2300de2cbec1e7e42c6aa688d901f96824e97"
  blocktime: number        // 1471614459
  confirmations: number    // 96059
  divisible: boolean       // false
  fee: string              // "0.00007432"
  ismine: boolean          // false
  positioninblock: number  // 471
  propertyid: number       // 59
  propertyname: string     // "Project Decorum Coin"
  referenceaddress: string // "1JctVXXi78yzHYC8iUJfMMBKDSeDwyVGv5"
  sendingaddress: string   // "1Mseva8S1zNSSpZ8kHQmYqqaFcM75qEkKd"
  txid: string             // "f2096bb6feecd8f93ed8c75061a2145360f4f9862529de448f6084eacdb48788"
  type: string             // "Simple Send"
  type_int: number         // 0
  valid: boolean           // true
  version: number          // 0
}
