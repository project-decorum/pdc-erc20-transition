<template>
  <div class="container pb-5" id="app">
    <ul class="nav nav-tabs nav-fill mt-5 mb-4">
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

    <div class="alert alert-info" v-if="$store.state.contractDataPending || $store.state.burnAddressTxPending">
      Refreshing data...
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

    <router-link v-if="$router.currentRoute.name > 1" :to="{ name: Number($router.currentRoute.name) - 1 }" class="float-left btn btn-primary">previous step</router-link>
    <router-link v-if="$router.currentRoute.name < 4" :to="{ name: Number($router.currentRoute.name) + 1 }" class="float-right btn btn-primary">next step</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
