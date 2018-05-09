<template>
  <div>
    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Step 1 - Your Ethereum address</h2>
        <p class="lead">
          An address you can send and receive from. For example an address on <a href="https://www.myetherwallet.com/">myetherwallet.com</a>.
        </p>
      </div>
      <div class="card-body">
        <form>
          <div class="form-row">
            <label for="eth-address">Ethereum address</label>
            <input type="text" class="form-control form-control-lg monospace" :class="{ 'is-valid': valid === true, 'is-invalid': valid === false }" id="eth-address" v-model="eth_address" required>
            <small class="form-text text-muted">An Ethereum address starts with '<samp>0x</samp>'.</small>

            <div class="valid-feedback">
              The address is valid.
            </div>
            <div class="invalid-feedback">
              Please enter a valid address.
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class S1 extends Vue {
  get eth_address() {
    return this.$store.state.eth_address
  }

  set eth_address(addr: string) {
    this.$store.commit('ETH_ADDRESS_UPDATE', addr)
  }

  get valid() {
    return this.$store.state.eth_address_valid
  }
}
</script>
