<template>
    <div class="binding-page">
        <h2>binding-page</h2>

        <!-- JS -->
        <!-- <h3>
            <span class="badge badge-secondary">JS</span>
        </h3>
        <input type="text" class="form-control" id="name" />
        <span id="text">入力された名前はです</span>
        <br />
        <br />-->
        <!-- Vue.js -->
        <h3>
            <span class="badge badge-secondary">Vue.js</span>
        </h3>
        <input class="form-control" v-model="state.name" />
        <span>入力された名前は{{ state.name }}です</span>
    </div>
</template>

<script setup lang="ts">

import { reactive } from 'vue';

const state = reactive({
    name: ""
});

</script>

<!-- <script>
// JS
window.onload = function () {
    const nameInput = document.getElementById('name');
    nameInput.oninput = function () {
        const name = nameInput.value;
        const text = document.getElementById('text');
        text.innerHTML = "入力された名前は" + name + "です";
    };
}
</script> -->

<style lang="scss" scoped>
.binding-page {
    padding: 20px;
}
</style>
