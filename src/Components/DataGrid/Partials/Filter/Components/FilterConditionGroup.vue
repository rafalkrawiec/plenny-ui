<script setup lang="ts">
  import { type PropType, computed } from 'vue';
  import { Operator } from '../../../Services/Filter/Constraint';
  import FilterNode from './FilterNode.vue';
  import type { ConditionGroup } from '../../../Services/Filter/ApplyFilter';
  import type { Column } from '../../../Services/ColumnFactory/Factory';
  import { useGroupColor } from '../../../../../Composables/UseGroupColor';
  import { trans } from '@plenny/translator';

  const emit = defineEmits(['remove']);

  defineProps({
    columns: { type: Array as PropType<Array<Column>>, required: true },
    parent: { type: Object as PropType<ConditionGroup>, required: false },
  });

  const node = defineModel('node', { type: Object as PropType<ConditionGroup>, required: true });
  const color = useGroupColor();

  function addConditionGroup() {
    node.value.conditions.push({
      conditions: [],
      operator: Operator.AND,
    });
  }

  function addCondition() {
    node.value.conditions.push({
      column: undefined,
      constraints: undefined,
      rule: undefined,
      check: undefined,
    });
  }

  const operators = computed(() => {
    return [
      { value: Operator.AND, label: trans('oraz') },
      { value: Operator.OR, label: trans('lub') },
    ];
  });
</script>
<template>
  <div class="stack vertical small w-100">
    <div class="stack horizontal align-items-center w-100">
      <div class="f-96">
        <HubFormSelect :options="operators" v-model="node.operator" :clearable="false" :searchable="false" />
      </div>
      <div class="stack smaller horizontal justify-content-between flex-grow">
        <HubButtonGroup>
          <HubButton transparent before="add-regular" @click="addCondition">
            {{ $t('Dodaj warunek') }}
          </HubButton>
          <HubButton transparent before="add-regular" @click="addConditionGroup">
            {{ $t('Dodaj grupę') }}
          </HubButton>
        </HubButtonGroup>
        <HubButton v-if="!!parent" transparent square before="delete-regular" v-tooltip="$t('Usuń')" @click="$emit('remove')" />
      </div>
    </div>
    <div v-if="node.conditions.length > 0" class="wrapper">
      <div class="children">
        <template v-for="(child, index) in node.conditions" :key="index">
          <div class="node">
            <div class="point"></div>
            <FilterNode :columns="columns" :parent="node" v-model:node="node.conditions[index]" @remove="node.conditions.splice(index, 1)" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .wrapper {
    --group-color: v-bind(color);

    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-left: 16px;
    width: 100%;

    .children {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .node {
      position: relative;
      border: 1px solid var(--themeNeutralAltBorder);
      border-radius: 4px;
      padding: 8px 16px;

      &:before {
        content: "";
        position: absolute;
        display: block;
        width: 16px;
        height: 50%;
        left: -16px;
        border-left: 1px solid var(--group-color);
        border-bottom: 1px solid var(--group-color);
        top: 0;
      }

      &:not(:last-child):after {
        content: "";
        position: absolute;
        display: block;
        width: 16px;
        height: calc(50% + 10px);
        left: -16px;
        top: 50%;
        border-left: 1px solid var(--group-color);
      }

      .point {
        position: absolute;
        display: block;
        width: 5px;
        height: 5px;
        left: -3px;
        top: 50%;
        background: var(--group-color);
        transform: translateY(-50%);
        outline: 3px solid var(--themeNeutralBackground);
      }
    }
  }

  .condition-group {
    display: flex;
    align-items: center;
    gap: 4px;
    flex: 0;
    border: 1px solid var(--themeNeutralAltBorder);
    border-radius: 16px;
    padding: 0 4px;
    font-size: 12px;

    &:hover {
      border-color: var(--themeNeutralAltBorderHover);

      .conditions {
        border-color: var(--themeNeutralAltBorderHover);
      }
    }

    .operator {
      font-weight: var(--fontWeightBold);
      line-height: 20px;
      white-space: nowrap;
      padding: 0 4px;
    }

    .conditions {
      display: flex;
      align-items: center;
      flex: 0;
      background-color: var(--themeNeutralBackground);
      border: 1px solid var(--themeNeutralAltBorder);
      border-radius: 16px;
      padding: 0 8px;
      margin: -1px 0;

      .inner {
        display: flex;
        align-items: center;
        flex: 0;
        gap: 4px;
        margin: -1px 0;
        background-color: var(--themeNeutralBackground);
        border: 1px solid var(--themeNeutralBackground);
      }
    }
  }
</style>
