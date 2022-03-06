<template>
    <div class="event-page">
        <h2>event-page</h2>

        <h3>
            <span class="badge badge-secondary">Vue.js</span>
        </h3>
        <span>クリックされた回数は{{ count }}回です</span>
        <br />
        <button id="button" class="btn btn-sm btn-info" @click="onClickButton()">Click Me</button>
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

const count = ref(0);

const onClickButton = () => {
    count.value++;
}
</script>

<style scoped>
.event-page {
    padding: 20px;
}
</style>
