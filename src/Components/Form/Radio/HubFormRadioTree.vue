<script setup lang="ts">
  import { ref, type PropType, computed } from 'vue';
  import { type NestedSet, nestedSetRoot, type NestedSetItem } from '@plenny/support';
  import { Control, useControl } from '../../../Composables/UseControl';

  const props = defineProps({
    ...Control,
    data: { type: Array as PropType<NestedSet<NestedSetItem>>, required: true },
    defaultValue: { type: [String, Number] as PropType<string | number>, required: false, default: '' },
  });

  const emit = defineEmits([
    'update:modelValue',
  ]);

  const { control, model } = useControl({ props, emit });

  const selected = computed({
    get: () => model.value,
    set: (value) => model.value = value,
  });

  const closed = ref<number[]>([]);

  const items = computed(() => {
    return nestedSetRoot(props.data);
  });

  const show = computed(() => {
    return closed.value.length <= 0;
  });

  function onUpdate(item: NestedSetItem) {
    selected.value = item.id;
  }

  function onClose(item: NestedSetItem) {
    let index = closed.value.findIndex((i) => i == item.id);

    if (index >= 0) {
      closed.value.splice(index, 1);
      return;
    }

    closed.value.push(item.id);
  }

  function closeAll() {
    if (closed.value.length <= 0) {
      closed.value = props.data.map((item) => item.id);
    } else {
      closed.value = [];
    }
  }

  function clear() {
    selected.value = '';
  }
</script>
<template>
  <HubFormControl v-bind="control">
    <template #controlElement>
      <div class="radio-tree">
        <div class="control">
          <HubFormRadioTreeItem v-bind="{ data, selected, item, closed }" v-for="item in items" :key="item.id" @update="onUpdate" @close="onClose" />
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
          <HubButton v-if="!required" transparent smaller before="bin-recycle-regular" @click="clear">
            {{ $t('Wyczyść') }}
          </HubButton>
        </HubButtonGroup>
      </div>
    </template>
  </HubFormControl>
</template>
<style lang="scss" scoped>
  .radio-tree {
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
