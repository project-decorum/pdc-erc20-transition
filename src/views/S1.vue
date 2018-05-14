<template>
  <div>
    <div class="text-center">
      <h1>Ethereum address</h1>
      <p class="lead">
        An address that can be sent and received from
      </p>
    </div>

    <div class="row my-5">
      <div class="col-lg py-4 bg-light">
        <div class="form-group">
          <label for="eth-address">Enter the Ethereum address:</label>
          <input type="text" class="form-control form-control-lg monospace" :class="{ 'is-valid': valid === true, 'is-invalid': valid === false }" id="eth-address" @keyup.enter="next" v-model="eth_address" required>

          <div class="valid-feedback">
            The address is valid.
          </div>
          <div class="invalid-feedback">
            The address is invalid!
          </div>
        </div>
      </div>
      <div class="col-lg py-4 bg-dark text-white">
        <p>Use an address that you can send and receive from. After conversion, this address will hold your ERC20 tokens.</p>

        <p>
          <strong>Do not use an address from an exchange. </strong><a target="_blank" href="https://www.myetherwallet.com">MyEtherWallet</a> offers a range of wallet options to chose from. We advise using a hardware wallet.
        </p>
      </div>
    </div>
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
