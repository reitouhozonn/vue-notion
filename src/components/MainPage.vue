<template>
  <div class="main-page">
    <div class="left-menu">
      <NoteItem
        v-for="note in noteList"
        v-bind:note="note"
        v-bind:key="note.id"
        @delete="onDeleteNote"
      />
      <button class="transparent" @click="onClickButtonAdd">
        <i class="fas fa-plus-square"></i>ノートを追加
      </button>
    </div>
    <div class="right-view">right-view</div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import NoteItem from './parts/NoteItem.vue';

// const noteList: any = reactive([
// ]);
const noteList: any = ref([])

function onClickButtonAdd(): void {
  noteList.value.push({
    id: new Date().getTime().toString(16),
    name: "新規ノート!",
    mouseover: false,
  });
}

function onDeleteNote(): void {
  const index = noteList.value.indexOf();
  noteList.value.splice(index, 1);
}

</script>

<style lang="scss" scoped>
.main-page {
  display: flex;
  height: calc(100vh - 7vh);

  .left-menu {
    width: 350px;
    background-color: #bbbbba;
  }
  .right-view {
    flex-grow: 1;
    padding: 10px;
    background-color: #f7f6f3;
  }
}
</style>
