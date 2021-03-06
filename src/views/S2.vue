<template>
  <div>
    <div class="text-center">
      <h1>Burning your OMNI PDC</h1>
      <p class="lead">
        Sending your OMNI PDC coins to your personal burn address
      </p>
    </div>

    <div class="row my-5">
      <div class="col-lg py-4 bg-light">
        <div class="alert alert-warning">
          <strong>Only send PDC to your burn address!</strong> Any other coins such as BTC cannot be recovered or reimbursed!
        </div>

        <div class="form-group">
          <label for="btc">Your burn address:</label>
          <input class="form-control form-control-lg monospace" type="text" id="btc" v-model="btc_address" readonly>
        </div>
      </div>
      <div class="col-lg py-4 bg-dark text-white">
        <p>
          The burn address is generated from your Ethereum address.
        </p>

        <p>
          Your OMNI PDC have to be sent to the burn address. This can be done from <a target="_blanl" rel="noopener" href="https://www.omniwallet.org/">OmniWallet</a>:

          <a :href="require('../assets/omniwallet-send.png')" target="_blank"><img class="img-fluid" src="../assets/omniwallet-send.png"></a>
        </p>
      </div>
    </div>


    <div class="row my-5">
      <div class="col-lg py-4 bg-light">
        <button class="float-right btn btn-info" type="button" @click="$store.dispatch('updateBurnTx')" :disabled="burnAddressTxPending">Refresh</button>

        <div class="table-responsive">
          <table class="table table-sm table-bordered table-hover">
            <thead class="thead-light">
              <tr>
                <th>Sender</th>
                <th>Amount</th>
                <th title="Confirmations">Conf.</th>
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
              <tr v-else-if="burnAddressTx === null">
                <td colspan="5">Unkown</td>
              </tr>
              <tr v-else-if="!burnAddressTx.length">
                <td colspan="5">No transactions...</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="text-muted">Total OMNI PDC burned</td>
                <td class="text-right"><strong><samp>{{ $store.getters.burned === null ? 'unknown' : $store.getters.burned.toString() }}</samp></strong></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      <div class="col-lg py-4 bg-dark text-white">
        <p>
          Shown is a table containing the last OMNI PDC transactions to <a target="_blank" rel="noopener" :href="'https://omniexplorer.info/address/' + btc_address"><samp>{{ btc_address }}</samp></a>.
        </p>

        <p>
          The burn transaction will have to be confirmed at least once. Meaning the transaction has been mined.
        </p>

        <p>
          Depending on the fee compared to other pending transactions, this might take a while.
        </p>
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
