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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {}
</script>
