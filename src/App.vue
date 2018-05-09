<template>
  <div class="container" id="app">
    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Step 1 - Your Ethereum address</h2>
        <p class="lead">
          An address you can send and receive from. For example an address on <a href="https://www.myetherwallet.com/">myetherwallet.com</a>.
        </p>
      </div>
      <div class="card-body form-group">
        <label for="eth">Enter your Ethereum address, starting with <samp>0x</samp></label>
        <input class="form-control form-control-lg monospace" type="text" id="eth" v-model="eth_address" required>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Step 2 - Bitcoin burn address</h2>
        <p class="lead">
          Burn your OMNI PDC-coins by sending them to the burn address.
        </p>
      </div>
      <div class="card-body form-group">
        <label for="btc">Bitcoin burn address</label>
        <input class="form-control form-control-lg monospace" type="text" id="btc" v-model="btc_address" readonly>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Step 3 - Wait for transaction to be processed</h2>
        <p class="lead">
          Wait for the burn transaction to be confirmed and for us to process it.
        </p>
      </div>
      <div class="card-body">
        <div class="card-text">
          <p>
            The burn transaction has to be confirmed on the Bitcoin blockchain. When the transaction is confirmed we'll update the Smart Contract to reflect the balance that is to be claimed.
          </p>
        </div>
        <div class="form-group">
          <label for="allowance">Allowance</label>
          <input class="form-control form-control-lg monospace" id="allowance" type="number" v-model="allowance" readonly>
        </div>
      </div>
    </div>

    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Step 4 - Claim your ERC20 coins</h2>
        <p class="lead">
          Send a claim transaction to the Smart Contract to receive your ERC20 coins you're entitled to.
        </p>
      </div>
      <div class="card-body form-group">
        <label for="contract-address">Contract address</label>
        <input class="form-control form-control-lg monospace" id="contract-address" type="text" value="0xE4f6f88811722F683bd212a2820F86391feb3161" readonly>

        <label for="data">Data to send to contract</label>
        <textarea class="form-control form-control-lg monospace" id="data" v-model="data" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { eth_to_btc, eth_validate, eth_to_allowance, eth_to_data } from './lib'

@Component({})
export default class App extends Vue {
  eth_address: string = ''
  btc_address: string = ''
  allowance: string = ''
  data: string = ''

  @Watch('eth_address')
  watchEthAddress() {
    const valid = eth_validate(this.eth_address)

    if (!valid) {
      this.btc_address = ''
      return
    }

    this.btc_address = eth_to_btc(this.eth_address)
  }

  @Watch('btc_address')
  async watchBtcAddress() {
    if (this.btc_address === '') {
      this.allowance = '';
      return
    }

    this.allowance = await eth_to_allowance(this.eth_address)
  }

  @Watch('allowance')
  async watchAllowance() {
    if (this.allowance === '' || this.allowance === '0') {
      this.data = '';
      return
    }

    this.data = await eth_to_data(this.eth_address)
  }
}
</script>
