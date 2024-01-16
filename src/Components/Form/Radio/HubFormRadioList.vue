<script setup lang="ts">
  import { type PropType } from 'vue';
  import { Control, useControl } from '../../../Composables/UseControl';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    ...Control,
    options: { type: Array as PropType<{ value: any, label: string }[]>, required: true, default: [] },
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
      <div class="radio-list">
        <div class="radio-wrapper">
          <div class="control">
            <div class="radio-list-item" v-for="option in options" :key="option.value">
              <label class="control-radio">
                <input
                  type="radio"
                  v-bind="{ ...input }"
                  :value="option.value"
                  v-model="model"
                />
                <span class="indicator">
                  <span class="icon checkmark-filled" />
                </span>
                <span class="description">
                  {{ option.label }}
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </template>
  </HubFormControl>
</template>
<style lang="scss" scoped>
  .radio-list {
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

    .radio-list-item {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .radio-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 12px
      }
    }
  }
</style>
