<template>
  <div class="main-page">
    <div class="left-menu" @click.self="onEditNoteEnd">
      <NoteItem
        v-for="note in noteList"
        v-bind:note="note"
        v-bind:key="note.id"
        @delete="onDeleteNote"
        @editEnd="onEditNoteEnd(note)"
        @select="onSelectNote(note)"
      />
      <!-- @addChild="onAddChildNote(note)" -->
      <button class="transparent" @click="onClickButtonAdd">
        <i class="fas fa-plus-square"></i>ノートを追加
      </button>
    </div>
    <div class="right-view" @click.self="onEditNoteEnd">
      <template v-if="selectedNote == null">
        <div class="no-selected-note">ノートを選択してください</div>
      </template>
      <template v-else>
        <div class="path">
          <!-- <small>{{ selectedPath }}</small> -->
        </div>
        <div class="note-content">
          <h3 class="note-title">{{ selectedNote.name }}</h3>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue';
import NoteItem from './parts/NoteItem.vue';
// const noteList: any = reactive([
// ]);
// interface refs {
//   any
// }

const noteList: any = ref([]);
const selectedNote: any = ref(null);
// const note = ref([])


function onClickButtonAdd(): void {
  noteList.value.push({
    id: new Date().getTime().toString(16),
    name: "新規ノート!",
    mouseover: false,
    editing: false,
    selected: false,
    children: [],
  });
}

// function onAddChildNote(note: any) {
//   // console.log('test    ' + note.children)
//   note.children.push({
//     id: new Date().getTime().toString(16),
//     name: 'の子',
//     mouseover: false,
//     editing: false,
//     // children: [],
//   });
// }

const onSelectNote = (targetNote: any) => {
  const updateSelectStatus = function (targetNote: any, noteList: any) {
    for (let note of noteList) {
      note.selected = (note.id === targetNote.id);
      updateSelectStatus(targetNote, note.children);
    }
  }
  updateSelectStatus(targetNote, noteList.value);
  // 選択中ノート情報を更新
  selectedNote.value = targetNote;
}

function onDeleteNote(): void {
  // console.log(note)
  // const targetList = note == !null
  //   ? noteList.value
  //   : note.children;
  // const index = targetList.indexOf(note);
  // targetList.splice(index, 1);


  const index = noteList.value.indexOf();
  noteList.value.splice(index, 1);
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

// const selectedPath = computed({
//   const searchSelectedPath = function (noteList, path) {
//     for (let note of noteList) {
//       const currentPath = path == null ? note.name : `${path} / ${note.name}`;
//       if (note.selected) return currentPath;
//       const selectedPath = searchSelectedPath(note.children, currentPath);
//       if (selectedPath.length > 0) return selectedPath;
//     }
//     return '';
//   },
//   return searchSelectedPath(noteList.value),
// }


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
    .no-selected-note {
      text-align: center;
      font-size: 25px;
      margin: 20px;
    }
    .path {
      text-align: left;
      margin-bottom: 50px;
    }
    .note-content {
      max-width: 900px;
      margin: 0 auto;
      text-align: left;
      .note-title {
        margin-bottom: 25px;
      }
    }
  }
}
</style>
