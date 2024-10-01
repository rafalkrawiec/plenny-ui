<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed, ref } from 'vue';
  import { useEditableColumn } from '../Composables/UseEditableColumn';
  import type { Column } from '../Services/ColumnFactory/Factory';

  const props = defineProps({
    column: { type: Object as PropType<Column>, required: true },
    data: { type: Object as PropType<Record<string, any>>, required: true },
    editable: { type: Boolean as PropType<boolean>, required: false, default: true },
    index: { type: Number as PropType<number>, required: true },
  });

  const control = ref();
  const cell = ref();

  const { editing, start, stop } = useEditableColumn(control, cell, props);

  const component = computed(() => {
    if (!editing.value) {
      return props.column.data.render({ column: props.column, data: props.data });
    } else {
      return props.column.edit.render({ column: props.column, data: props.data, index: props.index });
    }
  });

  const name = computed(() => {
    return props.column.edit.field({ column: props.column, data: props.data, index: props.index });
  });

  defineExpose({ cell, control });
</script>
<template>
  <div ref="cell" class="cell" :class="{ editing }" tabindex="0" @dblclick="start" @keydown="start">
    <template v-if="!editing">
      <component :is="component" />
      <HubFormValidationPopover :name="name" />
    </template>
    <template v-if="editing">
      <component
        ref="control"
        :is="component"
        @blur="stop"
        @keydown.esc="stop"
        @hide:dataList="stop"
      />
    </template>
  </div>
</template>
