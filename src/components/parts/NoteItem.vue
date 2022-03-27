<template>
  <div class="note-family">
    <div
      class="note"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
      @click="onClickSelect(note)"
      v-bind:class="{ mouseover: note.mouseover && !note.editing, selected: note.selected }"
    >
      <div v-if="note.editing">
        <input
          v-my-focus="'input'"
          type="text"
          class="transparent"
          v-model="note.name"
          @keypress.enter="onClickEditEnd(parentNote)"
        />
      </div>
      <template v-else>
        <div class="note-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="note-name">{{ note.name }}</div>

        <div v-show="note.mouseover" class="buttons">
          <div class="button-icon" v-if="layer < 3" @click="onClickChildNote(note)">
            <i class="fas fa-sitemap"></i>
          </div>
          <div class="button-icon" @click="onClickAddNoteAfter(parentNote, note)">
            <i class="fas fa-plus-circle"></i>
          </div>
          <div class="button-icon" @click="onClickEdit(note)">
            <i class="fas fa-edit"></i>
          </div>
          <div class="button-icon" @click.stop="onClickDelete(parentNote, note)">
            <i class="fas fa-trash"></i>
          </div>
        </div>
      </template>
    </div>
    <div class="child-note">
      <NoteItem
        v-for="childNote in note.children"
        v-bind:parentNote="note"
        v-bind:note="childNote"
        v-bind:key="childNote.id"
        v-bind:layer="layer + 1"
        @delete="onClickDelete"
        @editStart="onClickEdit"
        @editEnd="onClickEditEnd"
        @select="onClickSelect"
        @addChild="onClickChildNote"
        @addNoteAfter="onClickAddNoteAfter"
      />
    </div>
  </div>
</template>


<script setup lang="ts">

const props = defineProps({
  note: null,
  parentNote: null,
  // childNote: null,
  layer: null,
})

const emits = defineEmits([
  'delete',
  'editStart',
  'editEnd',
  'addChild',
  'select',
  'addNoteAfter',
]);



const vMyFocus = {
  mounted: (el: any): void => {
    el.focus();
  }
}

function onMouseOver(): void {
  props.note.mouseover = true;
}
function onMouseLeave(): void {
  props.note.mouseover = false;
}

const onClickDelete = (parentNote: any, note: any) => {
  emits('delete', parentNote, note);
}
const onClickEdit = (note: any) => {
  emits('editStart', note);
}
const onClickEditEnd = (parentNote: any) => {
  emits('editEnd', parentNote);
}
const onClickChildNote = (note: any) => {
  emits('addChild', note);
}
const onClickSelect = (note: any) => {
  emits('select', note);
}
const onClickAddNoteAfter = (parentNote: any, note: any) => {
  emits('addNoteAfter', parentNote, note);
}

</script>


<style scoped lang="scss">
.note {
  margin: 10px 0;
  display: flex;
  align-items: center;
  padding: 5px;
  color: rgba(25, 23, 17, 0.6);
  &.mouseover {
    background-color: rgb(232, 231, 228);
    cursor: pointer;
  }
  &.selected {
    color: black;
    background-color: rgb(232, 231, 228);
    font-weight: 600;
  }
  .note-icon {
    margin-left: 10px;
  }
  .note-name {
    width: 100%;
    padding: 3px 10px;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    .button-icon {
      padding: 3px;
      margin-left: 3px;
      border-radius: 5px;
    }
  }
}
.child-note {
  padding-left: 10px;
}
</style>
