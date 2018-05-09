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
          <input class="form-control form-control-lg monospace" id="allowance" type="number" v-model="allowance" readonly>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { eth_to_allowance } from '@/lib'

@Component({})
export default class S3 extends Vue {
  get allowance() {
    return this.$store.state.allowance
  }

  set allowance(addr: string | null) {
    this.$store.commit('ALLOWANCE_UPDATE', addr)
  }

  @Watch('$store.state.eth_address_valid', { immediate: true })
  async update() {
    if (this.$store.state.eth_address_valid !== true) {
      this.allowance = null
      return
    }

    this.allowance = await eth_to_allowance(this.$store.state.eth_address)
  }
}
</script>
