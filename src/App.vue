<template>
  <div class="container pb-5" id="app">
    <ul class="nav nav-tabs nav-fill mt-5 mb-4">
      <li class="nav-item">
        <router-link :to="{ name: '1', query: $route.query }" active-class="active" class="nav-link">Step 1</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: '2', query: $route.query }" active-class="active" class="nav-link">Step 2</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: '3', query: $route.query }" active-class="active" class="nav-link">Step 3</router-link>
      </li>
      <li class="nav-item">
        <router-link :to="{ name: '4', query: $route.query }" active-class="active" class="nav-link">Step 4</router-link>
      </li>
    </ul>

    <div class="alert alert-info" v-if="$store.state.contractDataPending || $store.state.burnAddressTxPending">
      Loading data...
    </div>
    <div class="alert alert-warning" v-else-if="$router.currentRoute.name > $store.getters.step">
      Step {{ $store.getters.step }} has not been completed yet.
    </div>
    <div class="alert alert-success" v-else-if="$router.currentRoute.name < $store.getters.step">
      This step has been completed.
    </div>
    <div class="alert invisible" v-else>
      -
    </div>

    <router-view/>

    <router-link v-if="$router.currentRoute.name > 1" :to="{ name: Number($router.currentRoute.name) - 1, query: $route.query }" class="float-left btn btn-primary">Previous step</router-link>
    <router-link v-if="$router.currentRoute.name < 4" :to="{ name: Number($router.currentRoute.name) + 1, query: $route.query }" class="float-right btn btn-primary">Next step</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  created() {
    // If there is a query parameter and it's not used yet
    if ('addr' in this.$route.query && this.$store.state.eth_address !== this.$route.query.addr) {
      this.$store.commit('ETH_ADDRESS_UPDATE', this.$route.query.addr)

      this.$store.dispatch('updateBurnTx')
      this.$store.dispatch('updateContractData')
    }
  }
}
</script>
