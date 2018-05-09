<template>
  <div>
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
import { eth_to_btc, eth_validate, eth_to_allowance, eth_to_data } from '@/lib'

@Component({})
export default class S1 extends Vue {
  private data: string = ''

  @Watch('$store.state.eth_address_valid', { immediate: true })
  async watchAllowance() {
    this.data = await eth_to_data(this.$store.state.eth_address)
  }
}
</script>
