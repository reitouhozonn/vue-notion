<template>
    <div class="main-page">
        <div class="left-menu">
            <div class="note" v-for="note in noteList" v-bind:key="note.id">
                <div class="note-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="note-name">{{ note.name }}</div>
            </div>

            <button class="transparent" @click="onClickButtonAdd">
                <i class="fas fa-plus-square"></i>ノートを追加
            </button>
        </div>
        <div class="right-view">right-view</div>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const noteList: any = reactive([
]);
const onClickButtonAdd = () => {
    noteList.push({
        id: new Date().getTime().toString(16),
        name: "新規ノート",
    })
};



</script>

<style lang="scss" scoped>
.main-page {
    display: flex;
    height: calc(100vh - 7vh);

    .left-menu {
        width: 350px;
        background-color: #bbbbba;

        .note {
            margin: 10px 0;
            display: flex;
            align-items: center;
            padding: 5px;
            color: rgba(25, 23, 17, 0.6);
            .note-icon {
                margin-left: 10px;
            }
            .note-name {
                width: 100%;
                padding: 3px 10px;
            }
        }
    }
    .right-view {
        flex-grow: 1;
        padding: 10px;
        background-color: #f7f6f3;
    }
}
</style>
