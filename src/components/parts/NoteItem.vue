<template>
  <div class="note-family">
    <div
      class="note"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
      v-bind:class="{ mouseover: note.mouseover && !note.editing }"
    >
      <template v-if="note.editing">
        <input
          v-my-focus="'input'"
          type="text"
          class="transparent"
          v-model="note.name"
          @keypress.enter="emits('editEnd')"
        />
      </template>
      <template v-else>
        <div class="note-icon">
          <i class="fas fa-file-alt"></i>
        </div>
        <div class="note-name">{{ note.name }}</div>

        <div v-show="note.mouseover" class="buttons">
          <div class="button-icon" @click="emits('addChild')">
            <i class="fas fa-sitemap"></i>
          </div>
          <div class="button-icon">
            <i class="fas fa-plus-circle"></i>
          </div>
          <div class="button-icon" @click="onEditNoteStart">
            <i class="fas fa-edit"></i>
          </div>
          <div class="button-icon" @click="emits('delete')">
            <i class="fas fa-trash"></i>
          </div>
        </div>
      </template>
    </div>
    <div class="child-note">
      <!-- {{ note.children }} -->
      <NoteItem
        v-for="childNote in note.children"
        v-bind:note="childNote"
        v-bind:key="childNote.id"
        @editEnd="onEditEnd"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
// interface prop {
//   mouseover?: boolean | undefined;
//   name?: string | undefined;
//   id?: string | undefined;


// }
const emits = defineEmits([
  'delete',
  'editStart',
  'note',
  'editEnd',
  'addChild',
  'onAddChildNote',
]);

const NoteItem = defineProps({
  note: null,
  // childNote: null,
})

const vMyFocus = {
  mounted: (el: any): void => {
    el.focus();
  }
}



// function onAddChildNote() {
//   NoteItem.note.children.push({
//     id: new Date().getTime().toString(16),
//     name: 'の子',
//     mouseover: false,
//     editing: false,
//     children: [],
//   });
// }




function onMouseOver(): void {
  NoteItem.note.mouseover = true;
}
function onMouseLeave(): void {
  NoteItem.note.mouseover = false;
}
function onEditNoteStart() {
  NoteItem.note.editing = true
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
