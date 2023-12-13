<script setup lang="ts">
  import { ref, type PropType, computed } from 'vue';
  import { type NestedSet, nestedSetRoot, nestedSetAncestors, nestedSetDescendants } from '@plenny/support';
  import { Control, useControl } from '../../../Composables/UseControl';
  import HubFormCheckboxTreeItem from './HubFormCheckboxTreeItem.vue';

  const props = defineProps({
    ...Control,
    data: { type: Array as PropType<NestedSet>, required: true },
    defaultValue: { type: Array as PropType<NestedSet>, required: false, default: [] },
    descendants: { type: Boolean as PropType<boolean>, required: false, default: false },
  });

  const emit = defineEmits([
    'update:modelValue',
  ]);

  const { control, model } = useControl({ props, emit });

  const selected = computed({
    get: () => props.data.filter(item => model.value.includes(item.id)),
    set: (value) => model.value = value.map(item => item.id),
  });

  const closed = ref<number[]>([]);

  const items = computed(() => {
    return nestedSetRoot(props.data);
  });

  const show = computed(() => {
    return closed.value.length <= 0;
  });

  const indeterminate = computed(() => {
    return [...new Set(selected.value.flatMap((item) => {
      if (props.descendants) {
        return nestedSetDescendants(props.data, item);
      } else {
        return nestedSetAncestors(props.data, item);
      }
    }))];
  });

  function onUpdate(item) {
    let index = selected.value.findIndex((i) => i.id == item.id);

    if (index >= 0) {
      selected.value.splice(index, 1);
      selected.value = [...selected.value];
      return;
    }

    selected.value = [...selected.value, item];
  }

  function onClose(item) {
    let index = closed.value.findIndex((i) => i == item);

    if (index >= 0) {
      closed.value.splice(index, 1);
      return;
    }

    closed.value.push(item);
  }

  function closeAll() {
    if (closed.value.length <= 0) {
      closed.value = props.data.map((item) => item.id);
    } else {
      closed.value = [];
    }
  }
</script>
<template>
  <HubFormControl v-bind="control">
    <template #controlElement>
      <div class="checkbox-tree">
        <div class="control">
          <HubFormCheckboxTreeItem
            v-bind="{ data, item, selected, closed, indeterminate }"
            v-for="item in items"
            :key="item.id"
            @update="onUpdate"
            @close="onClose"
          />
        </div>
      </div>
      <div class="below">
        <HubButtonGroup>
          <HubButton v-if="show" transparent smaller before="arrow-minimize-vertical-regular" @click="closeAll">
            {{ $t('Ukryj wszystkie') }}
          </HubButton>
          <HubButton v-else transparent smaller before="arrow-maximize-vertical-regular" @click="closeAll">
            {{ $t('Pokaż wszystkie') }}
          </HubButton>
        </HubButtonGroup>
      </div>
    </template>
  </HubFormControl>
</template>
<style lang="scss" scoped>
  .checkbox-tree {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .control {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 8px;
      height: auto !important;
      max-height: 284px;
      overflow: auto;
      min-height: 32px;
    }
  }
</style>
