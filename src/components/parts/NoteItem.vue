<template>
  <div
    class="note"
    @mouseover="onMouseOver"
    @mouseleave="onMouseLeave"
    v-bind:class="{ mouseover: note.mouseover && !note.editing }"
  >
    <template v-if="note.editing">
      <input class="transparent" v-model="note.name" @keypress.enter="emit('editEnd')" />
    </template>
    <template v-else>
      <div class="note-icon">
        <i class="fas fa-file-alt"></i>
      </div>
      <div class="note-name">{{ note.name }}</div>

      <div v-show="note.mouseover" class="buttons">
        <div class="button-icon">
          <i class="fas fa-sitemap"></i>
        </div>
        <div class="button-icon">
          <i class="fas fa-plus-circle"></i>
        </div>
        <div class="button-icon" @click="emit('editStart')">
          <i class="fas fa-edit"></i>
        </div>
        <div class="button-icon" @click="emit('delete')">
          <i class="fas fa-trash"></i>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">


// interface prop {
//   mouseover?: boolean | undefined;
//   name?: string | undefined;
//   id?: string | undefined;
// }
const emit = defineEmits([
  'delete', 'note',
  'editStart',
  'note',
  'editEnd',
]);

const NoteItem = defineProps({
  note: null,
})

function onMouseOver(): void {
  NoteItem.note.mouseover = true;
}
function onMouseLeave(): void {
  NoteItem.note.mouseover = false;
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
</style>
