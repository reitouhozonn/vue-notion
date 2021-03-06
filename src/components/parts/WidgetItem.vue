<template>
  <div class="widget-family">
    <div
      class="widget"
      @mouseover="onMouseOver"
      @mouseleave="onMouseLeave"
      v-bind:class="{ mouseover: widget.mouseover }"
    >
      <template v-if="widget.type == 'heading'">
        <input
          type="text"
          v-my-focus="'input'"
          v-model="widget.text"
          class="heading transparent"
          placeholder="見出し"
        />
      </template>
      <template v-if="widget.type == 'body'">
        <input
          type="text"
          v-my-focus="'input'"
          v-model="widget.text"
          class="body transparent"
          placeholder="本文"
        />
      </template>
      <template v-if="widget.type == 'code'">
        <textarea
          v-model="widget.text"
          v-my-focus="'textarea'"
          class="code"
          rows="1"
          placeholder="コード"
          v-bind:ref="(el) => codeHeightId = el"
        ></textarea>
      </template>
      <div v-show="widget.mouseover" class="buttons">
        <div class="button-icon" v-if="layer < 3" @click="onClickChildWidget(widget)">
          <i class="fas fa-sitemap"></i>
        </div>
        <div class="button-icon" @click="onClickAddWidgetAfter(parentWidget, widget)">
          <i class="fas fa-plus-circle"></i>
        </div>
        <div class="button-icon" @click="onClickDelete(parentWidget, widget)">
          <i class="fas fa-trash"></i>
        </div>
        <div class="button-icon">
          <i class="fas fa-cog" data-toggle="dropdown"></i>
          <div class="dropdown-menu">
            <a class="dropdown-item" @click="widget.type = 'heading'">見出し</a>
            <a class="dropdown-item" @click="widget.type = 'body'">本文</a>
            <a class="dropdown-item" @click="widget.type = 'code'">ソースコード</a>
          </div>
        </div>
      </div>
    </div>
    <div class="child-widget">
      <WidgetItem
        v-for="childWidget in widget.children"
        v-bind:widget="childWidget"
        v-bind:parentWidget="widget"
        v-bind:layer="layer + 1"
        v-bind:key="childWidget.id"
        @delete="onClickDelete"
        @addChild="onClickChildWidget"
        @addWidgetAfter="onClickAddWidgetAfter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, watchEffect, watchPostEffect } from 'vue';


const props = defineProps({
  widget: null,
  parentWidget: null,
  layer: null,
})

const codeHeightId = ref()

const emits = defineEmits([
  'delete',
  'addChild',
  'addWidgetAfter'
])

const onMouseOver = () => {
  props.widget.mouseover = true
}
const onMouseLeave = () => {
  props.widget.mouseover = false
}

const vMyFocus = {
  mounted: (el: any): void => {
    el.focus();
  }
}

const resizeCodeTextarea = () => {
  if (props.widget.type !== 'code') return;
  const textarea: any = codeHeightId.value;
  const promise = new Promise(function (resolve) {
    resolve(textarea.style = 'auto')
  });
  promise.then(function () {
    textarea.style.height = textarea.scrollHeight + 'px'
  });
}
watch(() => props.widget.text, () => {
  resizeCodeTextarea()
});
watchPostEffect(() => {
  resizeCodeTextarea()
})

const onClickDelete = (parentWidget: any, widget: any) => {
  emits('delete', parentWidget, widget)
}
const onClickChildWidget = (widget: any) => {
  emits('addChild', widget)
}
const onClickAddWidgetAfter = (parentWidget: any, widget: any) => {
  emits('addWidgetAfter', parentWidget, widget)
}

</script>



<style scoped lang="scss">
.widget {
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  color: rgba(25, 23, 17, 0.6);
  &.mouseover {
    background-color: rgb(232, 231, 228);
    cursor: pointer;
  }
  .buttons {
    display: flex;
    flex-direction: row;
    cursor: pointer;
    .button-icon {
      padding: 3px;
      margin-left: 3px;
      border-radius: 5px;
    }
  }
  input {
    background-color: rgb(232, 231, 228);
  }
  input.heading {
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #bbbbba;
  }
  .code {
    width: calc(100% - 120px);
    height: 35px;
    padding: 5px 10px;
    border: none;
    border-radius: 8px;
    color: #f8f8f2;
    background: #282a36;
    font-size: 14px;
    font-family: Consolas, Menlo, "Liberation Mono", Courier, monospace;
    resize: none;
  }
  .code:focus {
    outline: none;
    box-shadow: none;
  }
}
.child-widget {
  padding-left: 10px;
}
</style>
