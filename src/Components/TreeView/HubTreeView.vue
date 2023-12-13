<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed } from 'vue';
  import type { NestedSet, NestedSetItem } from '@plenny/support';
  import { nestedSetRoot } from '@plenny/support';
  import HubTreeItem from './Components/HubTreeItem.vue';
  import { useTreeDraggable } from '../../Composables/UseTreeDraggable';

  defineSlots<{
    actions(props: { item: NestedSetItem }): any,
    title(props: { item: NestedSetItem }): any,
  }>();

  const props = defineProps({
    data: { type: Array as PropType<NestedSet>, required: false, default: [] },
    allow: { type: Function as PropType<(item: any) => boolean>, required: false, default: () => true },
  });

  const root = computed(() => {
    return nestedSetRoot(props.data);
  });

  const emit = defineEmits([
    'update:order',
  ]);

  const draggable = useTreeDraggable({
    update: (data) => emit('update:order', data),
  });
</script>
<template>
  <div v-if="data.length > 0" class="tree-view" @drop="draggable.onDrop" @dragover="$event.preventDefault()" @dragenter="$event.preventDefault()">
    <HubTreeItem :allow="allow" :draggable="draggable" :data="data" :item="item" v-for="item in root" :key="item.id">
      <template #title="{ item }">
        <slot name="title" :item="item">
          {{ item.title }}
        </slot>
      </template>
      <template #actions="{ item }">
        <slot name="actions" :item="item" />
      </template>
    </HubTreeItem>
  </div>
  <HubDataPlaceholder v-if="data.length <= 0" />
</template>
<style lang="scss">
  .tree-view {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
