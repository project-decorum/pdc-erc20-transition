<template>
  <div>
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

          <div class="input-group">
            <input class="form-control form-control-lg monospace"  :class="{ 'is-valid': Number(allowance) > 0 }" id="allowance" type="number" v-model="allowance" readonly>
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" @click="$store.dispatch('update')">refresh</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class S3 extends Vue {
  get allowance() {
    return this.$store.getters.allowance_decimal
  }
}
</script>
