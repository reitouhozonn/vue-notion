<template>
    <div class="main-page">
        <div class="left-menu">left-menu</div>
        <div class="right-view">right-view</div>
    </div>
</template>

<script setup lang="ts">


</script>

<style lang="scss" scoped>
.main-page {
    display: flex;
    height: calc(100vh - 60px);

    .left-menu {
        width: 350px;
        background-color: #f7f6f3;
    }
    .right-view {
        flex-grow: 1;
        padding: 10px;
    }
}
</style>
