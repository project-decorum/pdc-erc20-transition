<template>
  <div>
    <div class="text-center">
      <h1>Ethereum address</h1>
      <p class="lead">
        -
      </p>
    </div>

    <div class="row my-5">
      <div class="col-lg py-4 bg-light">
        <div class="form-group">
          <label for="eth-address">Enter your Ethereum (ETH) address:</label>
          <input ref="eth" type="text" class="form-control form-control-lg monospace" :class="{ 'is-valid': valid === true, 'is-invalid': valid === false }" id="eth-address" @keyup.enter="next" v-model="eth_address" required>

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
          <strong>Do not use an address from an exchange. </strong><a target="_blank" rel="noopener" href="https://www.myetherwallet.com">MyEtherWallet</a> offers a range of wallet options to chose from. We advise using a hardware wallet.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class S2 extends Vue {
  mounted() {
    // Focus the input field on load
    (<HTMLElement>this.$refs.eth).focus()
  }

  get eth_address() {
    return this.$store.state.eth_address
  }

  set eth_address(addr: string) {
    this.$store.commit('ETH_ADDRESS_UPDATE', addr)

    // Push the address as query parameter
    if (this.valid) {
      this.$router.push({ name: '1', query: { addr } })
    } else {
      this.$router.push({ name: '1' })
    }

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
