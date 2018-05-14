<template>
  <div>
    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Wait for approval</h2>
        <p class="lead">
          Project Decorum will regularly approve the OMNI PDC burn transactions. Once approved, the coins can be claimed.
        </p>
      </div>
      <div class="card-body">
        <button class="btn btn-block btn-primary mb-4" type="button" @click="$store.dispatch('updateContractData')">refresh</button>

        <div class="alert alert-warning my-5" v-if="has_balance">
          <strong>{{ $store.getters.balance_decimal.toString() }} PDC has been claimed already.</strong>
        </div>

        <div class="form-group my-5">
          <label for="allowance">Claimable:</label>
          <input class="form-control form-control-lg monospace"  :class="{ 'is-valid': Number(allowance) > 0 }" id="allowance" type="number" v-model="allowance" readonly>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class S3 extends Vue {
  created() {
    if (this.$store.state.allowance === null) {
      this.$store.dispatch('updateContractData')
    }
  }

  get allowance() {
    return this.$store.getters.allowance_decimal
  }

  get has_balance() {
    return this.$store.state.balance !== null && !this.$store.state.balance.isZero()
  }
}
</script>
