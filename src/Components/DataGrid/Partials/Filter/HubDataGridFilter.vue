<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { Column } from '../../Services/ColumnFactory/Factory';
  import type { ConditionGroup } from '../../Services/Filter/ApplyFilter';
  import FilterNode from './Components/FilterNode.vue';

  const props = defineProps({
    columns: { type: Array as PropType<Array<Column>>, required: true },
    filter: { type: Object as PropType<ConditionGroup>, required: true },
  });
</script>
<template>
  <div class="data-grid-filters">
    <FilterNode :columns="columns" :node="filter"/>
  </div>
</template>
<style scoped lang="scss">
  .data-grid-filters {
    display: flex;
  }
</style>
