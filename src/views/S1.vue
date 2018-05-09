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
        <eth-address v-model="eth_address" @valid="valid = $event" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { eth_to_btc, eth_validate, eth_to_allowance, eth_to_data } from '@/lib'

import EthAddress from '@/views/component/eth-address.vue'

@Component({
  components: {
    'eth-address': EthAddress,
  }
})
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
  set valid(valid: boolean) {
    this.$store.commit('ETH_ADDRESS_VALID_UPDATE', valid)
  }
}
</script>
