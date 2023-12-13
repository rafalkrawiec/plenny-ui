<script setup lang="ts">
  import type { PropType } from 'vue';
  import FilterConditionGroup from './FilterConditionGroup.vue';
  import FilterCondition from './FilterCondition.vue';
  import type { ConditionGroup, Condition } from '../../../Services/Filter/ApplyFilter';
  import { computed } from 'vue';
  import type { Column } from '../../../Services/ColumnFactory/Factory';

  const props = defineProps({
    columns: { type: Array as PropType<Array<Column>>, required: true },
    parent: { type: Object as PropType<ConditionGroup>, required: false },
    node: { type: Object as PropType<ConditionGroup | Condition>, required: true },
  });

  const component = computed(() => {
    if ('conditions' in props.node) {
      return FilterConditionGroup;
    } else {
      return FilterCondition;
    }
  });

  defineEmits(['remove']);
</script>
<template>
  <component
    :is="component as any"
    :columns="columns"
    :node="node"
    :parent="parent"
    @remove="$emit('remove')"
  />
</template>

