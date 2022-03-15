<template>
  <div class="main-page">
    <div class="left-menu" @click.self="onEditNoteEnd">
      <NoteItem
        v-for="note in noteList"
        v-bind:note="note"
        v-bind:key="note.id"
        @delete="onDeleteNote(note)"
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
          <WidgetItem
            v-for="widget in selectedNote.widgetList"
            v-bind:widget="widget"
            v-bind:layer="1"
            v-bind:key="widget.id"
            @delete="onDeleteWidget"
            @addChild="onAddChildWidget"
            @addWidgetAfter="onAddWidgetAfter"
          />
          <button class="transparent" @click="onClickButtonAddWidget">
            <i class="fas fa-plus-square"></i>ウィジェットを追加
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs } from 'vue';
import NoteItem from './parts/NoteItem.vue';
import WidgetItem from './parts/WidgetItem.vue';

const noteList: any = ref([]);
const selectedNote: any = ref(null);




function onClickButtonAdd(): void {
  noteList.value.push({
    id: new Date().getTime().toString(16),
    name: "新規ノート!",
    mouseover: false,
    editing: false,
    selected: false,
    children: [],
    widgetList: [],
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

function onDeleteNote(note: any): void {
  // console.log(note)
  // const targetList = note == !null
  //   ? noteList.value
  //   : note.children;
  // const index = targetList.indexOf(note);
  // targetList.splice(index, 1);

  const index = noteList.value.indexOf();
  noteList.value.splice(index, 1);

}

// function onEditNoteStart() {
//   for (let note of noteList.value) {
//     note.editing = true;
//   }
// }
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


//##############  Widget ##################

const onAddWidgetCommon = (targetList: any,) => {
  let layerNumber = null;
  const layer = layerNumber || 1;

  const widgetItems = {
    id: new Date().getTime().toString(16),
    type: "heading",
    text: "",
    mouseover: false,
    children: [],
    layer: layer,
  }
  // if (index == null) {
  selectedNote.value.widgetList.push(widgetItems);
  // } else {
  //    targetList.splice(index + 1, 0, widget);
}
const onClickButtonAddWidget = (targetList: any) => {
  onAddWidgetCommon(selectedNote.widgetList);
}
const onAddChildWidget = (targetList: any) => {
  let layerNumber = null;
  const layer = layerNumber || 1;

  const widgetItems = {
    id: new Date().getTime().toString(16),
    type: "heading",
    text: "child",
    mouseover: false,
    children: [],
    layer: layer,
  }
  // layer + 1;
  targetList.children.push(widgetItems)
}

const onAddWidgetAfter = (parentWidget: any) => {
  const targetList = parentWidget == null ? selectedNote.value.widgetList : parentWidget;
  const layer = parentWidget == null ? null : parentWidget.layer + 1;
  onAddWidgetCommon(targetList);
}

const onDeleteWidget = (parentWidget: any, widget: any) => {
  const targetList = parentWidget == null ? selectedNote.value.widgetList : parentWidget.value.children;
  const index = targetList.indexOf();
  targetList.splice(index, 1);
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
