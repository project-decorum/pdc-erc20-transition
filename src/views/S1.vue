<template>
  <div>
    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Enter your Ethereum address</h2>
        <p class="lead">
          An address you can send and receive from.
        </p>
      </div>
      <div class="card-body">
        <div class="form-row">
          <label for="eth-address">Ethereum address</label>
          <input type="text" class="form-control form-control-lg monospace" :class="{ 'is-valid': valid === true, 'is-invalid': valid === false }" id="eth-address" @keyup.enter="next" v-model="eth_address" required>
          <small class="form-text text-muted">An Ethereum address starts with '<samp>0x</samp>'.</small>

          <div class="valid-feedback">
            The address is valid.
          </div>
          <div class="invalid-feedback">
            Please enter a valid address.
          </div>
        </div>
      </div>
    </div>

    <h3>Details</h3>
    <p>
      We advise
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class S2 extends Vue {
  get eth_address() {
    return this.$store.state.eth_address
  }

  set eth_address(addr: string) {
    this.$store.commit('ETH_ADDRESS_UPDATE', addr)

    // Reset other states
    this.$store.commit('CONTRACT_DATA_FULFILLED', [null, null, null])
    this.$store.commit('BURN_TX_FULFILLED', null)
  }

  get valid() {
    return this.$store.state.eth_address_valid
  }

  next() {
    if (this.valid) {
      this.$router.push('/2')
    }
  }
}
</script>
