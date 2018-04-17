import bitcore from 'bitcore-lib'
import web3 from 'web3'

export function eth_to_btc(eth_address_str: string) {
    const eth_address_buf = Buffer.from(eth_address_str.substring(2), 'hex')
    const eth_address_adr = bitcore.Address.fromPublicKeyHash(eth_address_buf)

    return eth_address_adr.toString()
}

export function eth_validate(eth_address_str: string) {
    return web3.utils.isAddress(eth_address_str)
}
