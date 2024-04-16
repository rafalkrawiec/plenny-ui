<script setup lang="ts">
  import { type PropType, ref, computed, watch } from 'vue';
  import { type NestedSetItem, type NestedSet, nestedSetChildren } from '@plenny/support';

  const emit = defineEmits(['update', 'close']);

  const input = ref<HTMLInputElement>();

  const props = defineProps({
    item: { type: Object as PropType<NestedSetItem>, required: true },
    data: { type: Array as PropType<NestedSet>, required: true },
    selected: { type: Array as PropType<NestedSetItem[]>, required: true },
    indeterminate: { type: Array as PropType<NestedSetItem[]>, required: true },
    closed: { type: Array as PropType<NestedSetItem[]>, required: true },
  });

  const children = computed(() => {
    return nestedSetChildren(props.data, props.item);
  });

  const checked = computed(() => {
    return !!props.selected.find((item) => props.item.id == item.id);
  });

  const close = computed(() => {
    return !!props.closed.find((item) => props.item.id == item.id);
  });

  const indeterminate = computed(() => {
    return !!props.indeterminate.find((item) => props.item.id == item.id);
  });

  const collapseIconClasses = computed(() => ({
    'chevron-up-filled': !close.value,
    'chevron-down-filled': close.value,
    'hidden': children.value.length <= 0,
  }));

  watch([indeterminate, checked, input], ([indeterminate, checked]) => {
    if (input.value) {
      input.value.indeterminate = indeterminate && !checked;
    }
  });

  function onUpdate() {
    emit('update', props.item);
  }

  function onClose() {
    emit('close', props.item);
  }

  function passThroughUpdate(item: NestedSetItem) {
    emit('update', item);
  }

  function passThroughClose(item: NestedSetItem) {
    emit('close', item);
  }
</script>
<template>
  <div class="checkbox-tree-item">
    <div class="checkbox-wrapper">
      <span class="icon" :class="collapseIconClasses" @click="onClose" />

      <label class="control-checkbox">
        <input ref="input" type="checkbox" :checked="checked" @input="onUpdate" />
        <span class="indicator">
          <span class="icon checkmark-filled" />
          <span class="icon subtract-filled" />
        </span>
        <span class="description">
          {{ item.title }}
        </span>
      </label>

    </div>

    <div v-if="children.length > 0 && !close" class="children">
      <HubFormCheckboxTreeItem
        v-bind="{ data, selected, closed, item: child, indeterminate: $props.indeterminate }"
        v-for="child in children"
        :key="child.id"
        @update="passThroughUpdate"
        @close="passThroughClose"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
  .checkbox-tree-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .checkbox-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 12px
    }

    .children {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-left: 32px;
    }

    .hidden {
      visibility: hidden;
    }
  }
</style>
