<script setup lang="ts">
  import type { PropType } from 'vue';
  import type { Column } from '../../Services/ColumnFactory/Factory';
  import type { ConditionGroup } from '../../Services/Filter/ApplyFilter';
  import FilterNode from './Components/FilterNode.vue';

  const open = defineModel('open', { type: Boolean, required: true });
  const filter = defineModel('filter', { type: Object as PropType<ConditionGroup>, required: true });

  defineProps({
    columns: { type: Array as PropType<Array<Column>>, required: true },
  });
</script>
<template>
  <HubToolbar sticky top>
    <h2>{{ $t('Filtrowanie') }}</h2>
  </HubToolbar>
  <div class="data-grid-filters">
    <FilterNode :columns="columns" v-model:node="filter" />
  </div>
  <HubToolbar sticky bottom>
    <HubButtonGroup>
      <HubButton @click="open = false">
        {{ $t('Zamknij') }}
      </HubButton>
    </HubButtonGroup>
  </HubToolbar>
</template>
<style scoped lang="scss">
  .data-grid-filters {
    display: flex;
  }
</style>
