<template>
  <div id="app">
    <div>
      <label for="eth">Ethereum address: </label>
      <input type="text" id="eth" v-model="eth_address" required>
    </div>
    <div>
      <label for="btc">Bitcoin address: </label>
      <input type="text" id="btc" v-model="btc_address" disabled>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import bitcore from 'bitcore-lib';
import web3 from 'web3';

function eth_to_btc(eth_address_str: string) {
    const eth_address_buf = Buffer.from(eth_address_str, 'hex');
    return bitcore.Address.fromPublicKeyHash(eth_address_buf).toString();
}


@Component({})
export default class App extends Vue {
  eth_address: string = '';
  btc_address: string = '';

  @Watch('eth_address')
  onInput() {
    const valid = web3.utils.isAddress(this.eth_address);

    if (!valid) {
      this.btc_address = '';
      return;
    }

    const eth_address_str = this.eth_address.substring(2);
    this.btc_address = eth_to_btc(eth_address_str);
  }
}
</script>

<style>

</style>
