<template>
  <div>
    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Step 2 - Bitcoin burn address</h2>
        <p class="lead">
          Burn your OMNI PDC-coins by sending them to the burn address.
        </p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="btc">Bitcoin burn address</label>
          <input class="form-control form-control-lg monospace" type="text" id="btc" v-model="btc_address" readonly>
        </div>

        <div class="form-group">
          <label for="burn-tx">Transactions</label>

          <div class="input-group">
            <input class="form-control form-control-lg monospace" :class="{ 'is-valid': burnAddressTx > 0 }" id="burn-tx" type="number" v-model="burnAddressTx" readonly>
            <div class="input-group-append">
              <button class="btn btn-primary" type="button" @click="$store.dispatch('updateBurnTx')">refresh</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class S2 extends Vue {
  get btc_address() {
    return this.$store.getters.btc_address
  }

  get burnAddressTx() {
    return this.$store.state.burnAddressTx
  }
}
</script>
