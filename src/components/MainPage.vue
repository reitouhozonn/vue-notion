<template>
  <div class="main-page">
    <div class="left-menu" @click.self="onEditNoteEnd()">
      <!-- 保存ボタン -->
      <button class="transparent" @click="onClickButtonSave">
        <i class="fas fa-save"></i> 内容を保存
      </button>
      <NoteItem v-for="note in noteList" v-bind:note="note" v-bind:layer="1" v-bind:key="note.id" @delete="onDeleteNote"
        @editEnd="onEditNoteEnd" @editStart="onEditNoteStart" @select="onSelectNote" @addChild="onAddChildNote"
        @addNoteAfter="onAddNoteAfter" />
      <button class="transparent" @click="onClickButtonAdd">
        <i class="fas fa-plus-square"></i>ノートを追加
      </button>
    </div>
    <div class="right-view" @click.self="onEditNoteEnd()">
      <template v-if="selectedNote == null">
        <div class="no-selected-note">ノートを選択してください</div>
      </template>
      <template v-else>
        <div class="path">
          <small>{{ selectedPath }}</small>
        </div>
        <div class="note-content">
          <h3 class="note-title">{{ selectedNote.name }}</h3>
          <WidgetItem v-for="widget in selectedNote.widgetList" v-bind:widget="widget" v-bind:layer="1"
            v-bind:key="widget.id" @delete="onDeleteWidget" @addChild="onAddChildWidget"
            @addWidgetAfter="onAddWidgetAfter" />
          <button class="transparent" @click="onClickButtonAddWidget">
            <i class="fas fa-plus-square"></i>ウィジェットを追加
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Static } from 'vue';
import NoteItem from './parts/NoteItem.vue';
import WidgetItem from './parts/WidgetItem.vue';

import { useToast } from "vue-toastification";

const noteList: any = ref([]);
const selectedNote: any = ref(null);


const localData = localStorage.getItem('NoteItem');
if (localData != null) {
  noteList.value = JSON.parse(localData);
}

const onClickButtonSave = () => {
  localStorage.setItem('NoteItem', JSON.stringify(noteList.value))
  const toast = useToast();
  toast.success('ノートを保存しました。');
}

const onAddNoteCommon = (targetList: any, layer: any, index: any) => {
  layer = layer || 1;
  const note = {
    id: new Date().getTime().toString(16),
    name: '新規ノート!-' + layer + '-' + targetList.length,
    mouseover: false,
    editing: false,
    selected: false,
    children: [],
    layer: layer,
    widgetList: [],
  }
  onAddWidgetCommon(note.widgetList, layer, index)
  if (index == null) {
    targetList.push(note);
  } else {
    targetList.splice(index + 1, 0, note);
  }
}

const onClickButtonAdd = (): void => {
  onAddNoteCommon(noteList.value, null, null)
}

function onAddChildNote(note: any) {
  onAddNoteCommon(note.children, note.layer + 1, null)
}

const onAddNoteAfter = (parentNote: any, note: any) => {
  const targetList = parentNote == null
    ? noteList.value
    : parentNote.children;
  const layer = parentNote == null
    ? 1
    : note.layer;
  const index = targetList.indexOf(note);
  onAddNoteCommon(targetList, layer, index);
}

const onSelectNote = (targetNote: any) => {
  const updateSelectStatus = function (targetNote: any, noteList: any) {
    for (let n of noteList) {
      n.selected = (n.id === targetNote.id);
      updateSelectStatus(targetNote, n.children);
    }
  }
  updateSelectStatus(targetNote, noteList.value);
  // 選択中ノート情報を更新
  selectedNote.value = targetNote;
}

const onDeleteNote = (parentNote: any, note: any): void => {
  const targetList = parentNote == null
    ? noteList.value
    : parentNote.children;
  const index = targetList.indexOf(note);
  targetList.splice(index, 1);
  if (targetList.id === selectedNote.id)
    selectedNote.value = null;
}

const onEditNoteStart = (editNote: any, parentNote: any) => {
  const targetList = parentNote == null
    ? noteList.value
    : parentNote.children;
  for (let n of targetList) {
    n.editing = (n.id === editNote.id);
    onEditNoteStart(editNote, n);
  }
}

const onEditNoteEnd = (parentNote?: any) => {
  const targetList = parentNote == null
    ? noteList.value
    : parentNote.children;
  for (let n of targetList) {
    n.editing = false;
    onEditNoteEnd(n);
  }
  for (let note of noteList.value) {
    note.editing = false;
  }
}
const selectedPath = computed(() => {
  const searchSelectedPath: any = function (noteList: any, path: any) {
    for (let note of noteList) {
      const currentPath = path == null ? note.name : `${path} / ${note.name}`;
      if (note.selected) return currentPath;
      const selectedPath = searchSelectedPath(note.children, currentPath);
      if (selectedPath.length > 0) return selectedPath;
    }
    return '';
  }
  return searchSelectedPath(noteList.value)
})


//##############      Widget      ##################

const onAddWidgetCommon = (targetList: any, layer: any, index: any) => {
  layer = layer || 1;
  const widgetItems = {
    id: new Date().getTime().toString(16),
    type: layer === 1 ? "heading" : "body",
    text: "",
    mouseover: false,
    children: [],
    layer: layer,
  }
  if (index == null) {
    targetList.push(widgetItems);
  } else {
    targetList.splice(index + 1, 0, widgetItems);
  }
}

function onClickButtonAddWidget(): void {
  onAddWidgetCommon(selectedNote.value.widgetList, null, null);
}
const onAddChildWidget = (widget: any) => {
  onAddWidgetCommon(widget.children, widget.layer + 1, null)
}

const onAddWidgetAfter = (parentWidget: any, widget: any) => {
  const targetList = parentWidget == null
    ? selectedNote.value.widgetList
    : parentWidget.children;
  const layer = parentWidget == null
    ? null
    : parentWidget.layer + 1;
  const index = targetList.indexOf(widget)
  onAddWidgetCommon(targetList, layer, index);
}

const onDeleteWidget = (parentWidget: any, widget: any) => {
  const targetList = parentWidget == null
    ? selectedNote.value.widgetList
    : parentWidget.children;
  const index = targetList.indexOf(widget);
  targetList.splice(index, 1);

  const focusWidget = (index === 0)
    ? parentWidget
    : targetList[index - 1];
  if (focusWidget != null) {
    focusWidget.id = (parseInt(focusWidget.id, 16) + 1).toString(16);
  }
}


</script>


<style lang="scss" scoped>
.main-page {
  display: flex;
  height: calc(100vh - 7vh);

  .left-menu {
    width: 350px;
    overflow: scroll;
    background-color: #bbbbba;
  }

  .right-view {
    flex-grow: 1;
    overflow: scroll;
    padding: 10px;
    background-color: rgb(232, 231, 228);

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
