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
    return this.$store.state.btc_address
  }

  set btc_address(addr: string | null) {
    this.$store.commit('BTC_ADDRESS_UPDATE', addr)
  }

  @Watch('$store.state.eth_address_valid', { immediate: true })
  async update() {
    if (this.$store.state.eth_address_valid === true) {
      this.btc_address = eth_to_btc(this.$store.state.eth_address)
    } else {
      this.btc_address = null
    }
  }
}
</script>
