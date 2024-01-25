<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed } from 'vue';
  import FilterConditionGroup from './FilterConditionGroup.vue';
  import FilterCondition from './FilterCondition.vue';
  import type { ConditionGroup, Condition } from '../../../Services/Filter/ApplyFilter';
  import type { Column } from '../../../Services/ColumnFactory/Factory';

  defineProps({
    columns: { type: Array as PropType<Array<Column>>, required: true },
    parent: { type: Object as PropType<ConditionGroup>, required: false },
  });

  const node = defineModel('node', { type: Object as PropType<ConditionGroup | Condition>, required: true });

  const component = computed(() => {
    if ('conditions' in node.value) {
      return FilterConditionGroup;
    } else {
      return FilterCondition;
    }
  });

  defineEmits(['remove']);
</script>
<template>
  <component :is="component" :columns="columns" :parent="parent" v-model:node="node" @remove="$emit('remove')" />
</template>

