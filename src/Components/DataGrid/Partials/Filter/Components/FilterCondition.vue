<script setup lang="ts">
  import { Rule } from '../../../Services/Filter/Constraints/Constraint';
  import type { ConditionGroup, Condition } from '../../../Services/Filter/ApplyFilter';
  import type { PropType } from 'vue';
  import type { Column } from '../../../Services/ColumnFactory/Factory';
  import { computed } from 'vue';
  import { watch } from 'vue';

  const props = defineProps({
    columns: { type: Array as PropType<Array<Column>>, required: true },
    parent: { type: Object as PropType<ConditionGroup>, required: false },
    node: { type: Object as PropType<Condition>, required: true },
  });

  const allOperators = [
    { value: Rule.EMPTY, label: 'jest pusty' },
    { value: Rule.NOT_EMPTY, label: 'nie jest pusty' },
    { value: Rule.EQUAL, label: 'jest równy' },
    { value: Rule.NOT_EQUAL, label: 'nie jest równy' },
    { value: Rule.STARTS_WITH, label: 'zaczyna się od' },
    { value: Rule.ENDS_WITH, label: 'kończy się na' },
    { value: Rule.CONTAINS, label: 'zawiera' },
    { value: Rule.HIGHER, label: 'jest większy od' },
    { value: Rule.HIGHER_OR_EQUAL, label: 'jest większy lub równy od' },
    { value: Rule.LOWER, label: 'jest mniejszy od' },
    { value: Rule.LOWER_OR_EQUAL, label: 'jest mniejszy lub równy od' },
    { value: Rule.IN, label: 'jest jednym z' },
    { value: Rule.NOT_IN, label: 'nie jest' },
  ];

  const symbols = {
    [Rule.EMPTY]: 'jest pusty',
    [Rule.NOT_EMPTY]: 'nie jest pusty',
    [Rule.EQUAL]: 'jest równy',
    [Rule.NOT_EQUAL]: 'nie jest równy',
    [Rule.STARTS_WITH]: 'zaczyna się od',
    [Rule.ENDS_WITH]: 'kończy się na',
    [Rule.CONTAINS]: 'zawiera',
    [Rule.HIGHER]: 'jest większy od',
    [Rule.HIGHER_OR_EQUAL]: 'jest większy lub równy od',
    [Rule.LOWER]: 'jest mniejszy od',
    [Rule.LOWER_OR_EQUAL]: 'jest mniejszy lub równy od',
    [Rule.IN]: 'jest jednym z',
    [Rule.NOT_IN]: 'nie jest',
  };

  const column = computed(() => {
    return props.columns.find((col) => col.key === props.node.column);
  });

  const operators = computed(() => {
    if (!column.value) {
      return [];
    }

    if (column.value.filter.rules.length > 0) {
      return allOperators.filter((op) => column.value!.filter.rules.includes(op.value));
    }

    return allOperators;
  });

  const columns = computed(() => {
    return props.columns.filter((col) => col.filter.enabled).map((col) => ({
      value: col.key,
      label: col.name,
    }));
  });

  watch(() => props.node.column, () => {
    props.node.value = undefined;
    props.node.constraint = undefined;

  });
  watch(() => props.node.constraint, (value) => {
    if (value &&  [Rule.EMPTY, Rule.NOT_EMPTY, Rule.IN, Rule.NOT_IN].includes(value)) {
      props.node.value = undefined;
    }

  });


  defineEmits(['remove']);
</script>

<template>
  <div class="condition">
    <div class="form-grid with-third">
      <HubFormSelect placeholder="Kolumna" :searchable="false" :clearable="false" :options="columns"
        v-model="node.column" />

      <HubFormSelect placeholder="Operator" :searchable="false" :clearable="false" :options="operators"
        v-model="node.constraint" />

      <template v-if="column && node.constraint && ![Rule.EMPTY, Rule.NOT_EMPTY].includes(node.constraint) ">
        <component placeholder="Wartość" :is="column.filter.render({ column, node })" v-model="node.value" />
      </template>
    </div>
    <HubButton transparent square before="delete-regular" v-tooltip="$t('Usuń')" @click="$emit('remove')" />
  </div>
</template>
<style scoped lang="scss">
  .condition {
    display: flex;
    align-items: center;
    flex: 0;
    gap: 4px;
  }
</style>
