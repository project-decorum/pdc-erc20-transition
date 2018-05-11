<template>
  <div>
    <div class="card my-4">
      <div class="card-header">
        <h2 class="card-title">Burning your OMNI PDC</h2>
        <p class="lead">
          Send your OMNI PDC coins to your personal burn address.
        </p>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="btc">Your burn address</label>
          <input class="form-control form-control-lg monospace" type="text" id="btc" v-model="btc_address" readonly>
        </div>

        <p>
          Total burned: {{ $store.getters.burned }}
        </p>

        <table class="table table-bordered">
          <caption>Last PDC transactions to <a target="_blank" :href="'https://omniexplorer.info/address/' + btc_address"><samp>{{ btc_address }}</samp></a></caption>

          <thead>
            <tr>
              <th>Sender</th>
              <th>Amount</th>
              <th>Confirmations</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tx in burnAddressTx" :key="tx.txid">
              <td><samp>{{ tx.sendingaddress }}</samp></td>
              <td class="text-right"><samp>{{ tx.amount }}</samp></td>
              <td class="text-right"><samp>{{ tx.confirmations }}</samp>{{ tx.confirmations === 0 ? ' (unconfirmed!)' : '' }}</td>
            </tr>
            <tr v-if="burnAddressTxPending">
              <td colspan="5">Refreshing...</td>
            </tr>
            <tr v-else-if="burnAddressTx === null || !burnAddressTx.length">
              <td colspan="5">No transactions...</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-block btn-primary" type="button" @click="$store.dispatch('updateBurnTx')" :disabled="burnAddressTxPending">refresh</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class S2 extends Vue {
  created() {
    if (this.$store.state.burnAddressTx === null) {
      this.$store.dispatch('updateBurnTx')
    }
  }

  get btc_address() {
    return this.$store.getters.btc_address
  }

  get burnAddressTx() {
    return this.$store.state.burnAddressTx
  }

  get burnAddressTxPending() {
    return this.$store.state.burnAddressTxPending
  }
}
</script>
