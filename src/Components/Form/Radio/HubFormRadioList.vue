<script setup lang="ts">
  import { type PropType } from 'vue';
  import { Control, useControl } from '../../../Composables/UseControl';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    ...Control,
    horizontal: { type: Boolean, required: false, default: false },
    options: { type: [Array, Object] as PropType<Iterable<{ value: any, label: string }>>, required: true, default: [] },
    defaultValue: { type: Array as PropType<any[]>, required: false, default: [] },
  });

  const emit = defineEmits([
    'update:modelValue',
  ]);

  const { control, input, model } = useControl({ props, emit });
</script>
<template>
  <HubFormControl v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
    <template #controlElement>
      <div class="radio-list" :class="{ horizontal }">
        <div class="radio-list-item" v-for="option in options" :key="option.value">
          <label class="control-radio">
            <input type="radio" v-bind="{ ...input }" :value="option.value" v-model="model" />
            <span class="indicator">
              <span class="icon checkmark-filled" />
            </span>
            <span class="description">
              {{ option.label }}
            </span>
          </label>
        </div>
      </div>
    </template>
  </HubFormControl>
</template>
<style lang="scss" scoped>
  .radio-list {
    display: flex;
    flex-direction: column;

    &.horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: 32px;
    }

    .radio-list-item {
      display: flex;
      padding: 6px 0;
    }
  }
</style>
