<script setup lang="ts">
  import { type PropType, ref, computed } from 'vue';
  import { type NestedSetItem, type NestedSet, nestedSetChildren } from '@plenny/support';

  const emit = defineEmits(['update', 'close']);

  const input = ref<HTMLInputElement>();

  const props = defineProps({
    item: { type: Object as PropType<NestedSetItem>, required: true },
    data: { type: Array as PropType<NestedSet>, required: true },
    selected: { type: Number as PropType<number>, required: false },
    closed: { type: Array as PropType<number[]>, required: true },
  });

  const children = computed(() => {
    return nestedSetChildren(props.data, props.item);
  });

  const close = computed(() => {
    return !!props.closed.find((item) => props.item.id == item);
  });

  const checked = computed(() => {
    return props.selected === props.item.id;
  });


  const collapseIconClasses = computed(() => ({
    'chevron-up-filled': !close.value,
    'chevron-down-filled': close.value,
    'hidden': children.value.length <= 0,
  }));


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
  <div class="radio-tree-item">
    <div class="radio-wrapper">
      <span class="icon" :class="collapseIconClasses" @click="onClose" />

      <label class="control-radio">
        <input type="radio" :checked="checked" @input="onUpdate" />
        <span class="indicator">
          <span class="icon checkmark-filled" />
        </span>
        <span class="description">
          {{ item.title }}
        </span>
      </label>
    </div>

    <div v-if="children.length > 0 && !close" class="children">
      <HubFormRadioTreeItem v-bind="{ data, selected, closed, item: child }" v-for="child in children" :key="child.id"
        @update="passThroughUpdate" @close="passThroughClose" />
    </div>


  </div>
</template>
<style lang="scss" scoped>
  .radio-tree-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .radio-wrapper {
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
