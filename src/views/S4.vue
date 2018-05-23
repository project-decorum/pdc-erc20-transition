<template>
  <div>
    <div class="text-center">
      <h1>Claiming the ERC20 coins</h1>
      <p class="lead">
        Call the Contract to receive your ERC20 coins you're entitled to
      </p>
    </div>

    <div class="alert alert-danger my-5" v-if="$store.state.paused">
      <strong>Claiming is paused.</strong>
      For now it's not possible to claim your tokens. The contract will be unpaused in due time.
    </div>

    <div class="row my-5">
      <div class="col-lg py-4 bg-light">

        <div class="alert alert-success my-5" v-if="has_balance">
          <strong>{{ $store.getters.balance_decimal.toString() }} PDC has been claimed already.</strong>
        </div>

        <button class="float-right btn btn-info" type="button" @click="refresh">Refresh</button>

        <div class="form-group mt-5">
          <label for="contract-address">Send to:</label>
          <input class="form-control form-control-lg monospace" id="contract-address" type="text" :value="contractAddress" readonly>
        </div>

        <div class="form-group">
          <label for="tx-data">Data to send:</label>
          <textarea class="form-control form-control-lg monospace" id="tx-data" v-model="txData" readonly></textarea>
        </div>
      </div>

      <div class="col-lg py-4 bg-dark text-white">
        <p>
          Calling the contract is done by sending a transaction that contains data. The transaction does not transact Ether. However, a transaction incurs a fee. Make sure the Ethereum address has sufficient Ether balance.
        </p>

        <p>
          The PDC need to be claimed using the address you provided.
        </p>

        <p>
          This transaction can be sent using MyEtherWallet:
          <a :href="require('../assets/mew-send.png')" target="_blank"><img class="img-fluid" src="../assets/mew-send.png"></a>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class S4 extends Vue {
  async created() {
    if (this.$store.state.balance === null) {
      await this.$store.dispatch('updateContractData')
    }

    await this.$store.dispatch('updateTxData')
  }

  async refresh() {
    await this.$store.dispatch('updateContractData')
    await this.$store.dispatch('updateTxData')
  }

  get txData() {
    return this.$store.state.txData
  }

  get contractAddress() {
    return process.env.VUE_APP_PDC_CONTRACT_ADDR
  }

  get has_balance() {
    return this.$store.state.balance !== null && !this.$store.state.balance.isZero()
  }
}
</script>
