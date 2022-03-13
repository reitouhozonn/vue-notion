<template>
  <div class="main-page">
    <div class="left-menu" @click.self="onEditNoteEnd">
      <NoteItem
        v-for="note in noteList"
        v-bind:note="note"
        v-bind:key="note.id"
        @addChild="onAddChildNote(note)"
        @delete="onDeleteNote(note)"
        @editEnd="onEditNoteEnd(note)"
      />
      <button class="transparent" @click="onClickButtonAdd">
        <i class="fas fa-plus-square"></i>ノートを追加
      </button>
    </div>
    <div class="right-view" @click.self="onEditNoteEnd">right-view</div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import NoteItem from './parts/NoteItem.vue';
// const noteList: any = reactive([
// ]);
// interface refs {
//   any
// }

const noteList: any = ref([]);
// const note = ref([])


function onClickButtonAdd(): void {
  noteList.value.push({
    id: new Date().getTime().toString(16),
    name: "新規ノート!",
    mouseover: false,
    editing: false,
    children: [],
  });
}

function onAddChildNote(note: any) {
  // console.log('test    ' + note.children)
  note.children.push({
    id: new Date().getTime().toString(16),
    name: 'の子',
    mouseover: false,
    editing: false,
    // children: [],
  });
}

function onDeleteNote(note: any): void {
  // console.log(note)
  const targetList = note == null
    ? noteList.value
    : note.children;
  const index = targetList.indexOf(note);
  targetList.splice(index, 1);
}

function onEditNoteStart() {
  for (let note of noteList.value) {
    note.editing = true;
  }
}
function onEditNoteEnd(note: any) {
  for (let n of noteList.value)
    n.editing = false;
  // note.children.editing = false;
}

// defineComponent({
//   NoteItem,
// })

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
