<script setup lang="ts">
  import { Rule } from '../../../Services/Filter/Constraint';
  import type { ConditionGroup, Condition } from '../../../Services/Filter/ApplyFilter';
  import type { PropType } from 'vue';
  import { computed, watch } from 'vue';
  import type { Column } from '../../../Services/ColumnFactory/Factory';
  import { trans } from '@plenny/translator';

  const emit = defineEmits(['remove']);

  const props = defineProps({
    columns: { type: Array as PropType<Array<Column>>, required: true },
    parent: { type: Object as PropType<ConditionGroup>, required: false },
  });

  const node = defineModel('node', { type: Object as PropType<Condition>, required: true });

  const available = [
    { value: Rule.EMPTY, label: trans('jest pusty') },
    { value: Rule.NOT_EMPTY, label: trans('nie jest pusty') },
    { value: Rule.EQUAL, label: trans('jest równy') },
    { value: Rule.NOT_EQUAL, label: trans('nie jest równy') },
    { value: Rule.STARTS_WITH, label: trans('zaczyna się od') },
    { value: Rule.ENDS_WITH, label: trans('kończy się na') },
    { value: Rule.INCLUDES, label: trans('zawiera') },
    { value: Rule.CONTAINS_ANY, label: trans('zawiera jeden z') },
    { value: Rule.CONTAINS_ALL, label: trans('zawiera każdy z') },
    { value: Rule.NOT_CONTAINS_ANY, label: trans('nie zawiera żadnego z') },
    { value: Rule.NOT_CONTAINS_ALL, label: trans('nie zawiera każdego z') },
    { value: Rule.HIGHER, label: trans('jest większy od') },
    { value: Rule.HIGHER_OR_EQUAL, label: trans('jest większy lub równy od') },
    { value: Rule.LOWER, label: trans('jest mniejszy od') },
    { value: Rule.LOWER_OR_EQUAL, label: trans('jest mniejszy lub równy od') },
    { value: Rule.IN, label: trans('jest jednym z') },
    { value: Rule.NOT_IN, label: trans('nie jest jednym z') },
    { value: Rule.IS_TRUE, label: trans('jest zaznaczony') },
    { value: Rule.IS_FALSE, label: trans('nie jest zaznaczony') },
  ];

  const column = computed(() => {
    return props.columns.find((col) => col.key === node.value.column);
  });

  const constraints = computed(() => {
    if (column.value) {
      return column.value.filter.constraints;
    } else {
      return [];
    }
  });

  const operators = computed(() => {
    if (constraints.value.length > 0) {
      return available.filter((rule) => constraints.value.some((constraint) => constraint.rules.includes(rule.value)));
    } else {
      return [];
    }
  });

  const columns = computed(() => {
    return props.columns.filter((col) => col.filter.enabled).map((col) => ({
      value: col.key,
      label: col.name,
    }));
  });

  const constraintRequiresInput = computed(() => {
    return node.value.rule && ![Rule.EMPTY, Rule.NOT_EMPTY, Rule.IS_TRUE, Rule.IS_FALSE].includes(node.value.rule);
  });

  watch([column, constraints], ([column, constraints]) => {
    node.value.constraints = constraints;
    node.value.check = undefined;
    node.value.rule = undefined;
  });
</script>
<template>
  <div class="condition">
    <div class="form-grid with-third">
      <HubFormSelect placeholder="Kolumna" :searchable="false" :clearable="false" :options="columns" v-model="node.column" />
      <HubFormSelect placeholder="Operator" :searchable="false" :clearable="false" :options="operators" v-model="node.rule" />
      <template v-if="column && constraintRequiresInput">
        <component placeholder="Wartość" :is="column.filter.render({ column, node })" v-model="node.check" />
      </template>
    </div>
    <HubButton transparent square before="delete-regular" v-tooltip="$t('Usuń')" @click="$emit('remove')" />
  </div>
</template>
<style scoped lang="scss">
  .condition {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4px;
  }
</style>
