<script setup lang="ts">

import NavigationBar from './components/NavigationBar.vue';

</script>

<template>
  <div id="app">
    <NavigationBar />
    <router-view />
  </div>
</template>

<style>
#app {
  height: 100vh
}

button.transparent {
  margin: 5px;
  background: transparent;
  border: none;
}

input.transparent {
  width: 100%;
  border: none;
  background-color: #f7f6f3;
}

input.transparent:focus {
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>
