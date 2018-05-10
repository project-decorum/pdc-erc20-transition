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
        <div>
          <p>Already claimed: {{ $store.getters.balance_decimal }}</p>
        </div>

        <label for="contract-address">Contract address</label>
        <input class="form-control form-control-lg monospace" id="contract-address" type="text" value="0xTODO" readonly>

        <label for="tx-data">Data to send to contract</label>
        <textarea class="form-control form-control-lg monospace" id="tx-data" v-model="txData" readonly></textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class S4 extends Vue {
  get txData() {
    return this.$store.state.txData
  }
}
</script>
