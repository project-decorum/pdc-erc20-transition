<template>
  <div>
    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Claiming the ERC20 coins</h2>
        <p class="lead">
          Send a claim transaction to the Contract to receive your ERC20 coins you're entitled to.
        </p>
      </div>
      <div class="card-body form-group">
        <button class="btn btn-primary" type="button" @click="refresh">refresh</button>

        <div>
          <p>Already claimed: {{ $store.getters.balance_decimal }}</p>
        </div>

        <div>
          <p>Paused: {{ $store.state.paused }}</p>
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
  async created() {
    if (this.$store.state.balance === null) {
      await this.$store.dispatch('updateContractData')
    }

    await this.$store.dispatch('updateTxData')
  }

  async refresh() {
    await this.$store.dispatch('updateContractData')
    await this.$store.dispatch('updateTxData')
  }

  get txData() {
    return this.$store.state.txData
  }
}
</script>
