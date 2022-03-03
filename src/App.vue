<script setup lang="ts">

import NavigationBar from './components/NavigationBar.vue';
import MainPage from './components/MainPage.vue';

</script>

<template>
    <div id="app">
        <NavigationBar />
        <router-view />
    </div>
</template>

<style>
#app {
    height: 100vh;
}
</style>
