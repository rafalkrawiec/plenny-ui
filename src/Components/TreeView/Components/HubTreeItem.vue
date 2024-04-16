<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed } from 'vue';
  import type { NestedSetItem, NestedSet } from '@plenny/support';
  import { nestedSetChildren } from '@plenny/support';
  import type { DragHandlers } from '../../../Composables/UseTreeDraggable';

  defineSlots<{
    title(props: { item: NestedSetItem }): any;
    actions(props: { item: NestedSetItem }): any;
  }>();

  const props = defineProps({
    data: { type: Object as PropType<NestedSet>, required: true },
    item: { type: Object as PropType<NestedSetItem>, required: true },
    draggable: { type: Object as PropType<DragHandlers>, required: true },
    allow: { type: Function as PropType<(item: any) => boolean>, required: false, default: () => true },
  });

  const children = computed(() => {
    return nestedSetChildren(props.data, props.item);
  });
</script>
<template>
  <div class="tree-view-item">
    <HubCard
      :data-id="item.id"
      :draggable="allow(item)"
      @dragstart="(e: DragEvent) => draggable.onDragStart(e, item)"
      @dragover="(e: DragEvent) => draggable.onDragOver(e, item)"
      @dragenter="(e: DragEvent) => draggable.onDragEnter(e, item)"
      @dragleave="(e: DragEvent) => draggable.onDragLeave(e, item)"
      @dragend="(e: DragEvent) => draggable.onDragEnd(e)"
    >
      <HubCardHeader>
        <template #title>
          <slot name="title" :item="item">
            {{ item.title }}
          </slot>
        </template>
        <template #actions>
          <slot name="actions" :item="item" />
        </template>
      </HubCardHeader>
    </HubCard>
    <div class="children" v-show="children.length > 0">
      <HubTreeItem :draggable="draggable" :data="data" :item="child" v-for="child in children" :key="child.id">
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
  </div>
</template>
<style lang="scss">
  .tree-view-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .children {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-left: 32px;
    }
  }
</style>
