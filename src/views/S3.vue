<template>
  <div>
    <div class="text-center">
      <h1>Waiting for approval</h1>
      <p class="lead">
        Project Decorum will regularly approve the OMNI PDC burn transactions. Once approved, the coins can be claimed.
      </p>
    </div>

    <div class="row my-5">
      <div class="col-lg py-4 bg-light">
        <div class="alert alert-warning my-4" v-if="has_balance">
          <strong>{{ $store.getters.balance_decimal.toString() }} PDC has been claimed already.</strong>
        </div>

        <div class="form-group">
          <button class="float-right btn btn-info" type="button" @click="$store.dispatch('updateContractData')">Refresh</button>
          <label for="allowance">Claimable:</label>
          <input class="form-control form-control-lg monospace"  :class="{ 'is-valid': Number(allowance) > 0 }" id="allowance" type="number" v-model="allowance" readonly>
        </div>
      </div>
      <div class="col-lg py-4 bg-dark text-white">
        For security reasons we currently validate issuance manually, we try to do this at least twice per day. Thank you for your patience.
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
