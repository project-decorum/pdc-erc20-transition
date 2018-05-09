<template>
  <div>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { eth_to_btc, eth_validate, eth_to_allowance, eth_to_data } from '@/lib'

@Component({})
export default class S2 extends Vue {
  get btc_address() {
    return this.$store.getters.btc_address
  }
}
</script>
