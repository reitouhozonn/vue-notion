<template>
    <div class="directive-page">
        <h2>directive-page</h2>
        <h3>
            <span class="badge badge-secondary">Vue.js</span>
        </h3>
        <input type="checkbox" v-model="state.checked" />
        <span v-show="state.checked">チェック時だけ見えるよ</span>
    </div>
</template>


<script setup lang="ts">
import { reactive } from 'vue';

const state: boolean = reactive({
    checked: false
})

</script>


<style lang="scss" scoped>
.directive-page {
    padding: 20px;
}
</style>
