<template>
  <div class="container" id="app">
    <ul class="nav nav-tabs nav-fill my-5">
      <li class="nav-item">
        <router-link to="/1" active-class="active" class="nav-link">Step 1</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/2" active-class="active" class="nav-link">Step 2</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/3" active-class="active" class="nav-link">Step 3</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/4" active-class="active" class="nav-link">Step 4</router-link>
      </li>
    </ul>

    <router-view/>

    <div class="alert alert-info" v-if="$store.state.contractDataPending || $store.state.burnAddressTxPending">
      Refreshing data...
    </div>
    <div class="alert alert-warning" v-else-if="$router.currentRoute.name > $store.getters.step">
      Step {{ $store.getters.step }} has not been completed yet.
    </div>
    <div class="alert alert-success" v-else-if="$router.currentRoute.name < $store.getters.step">
      This step has been completed.
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
