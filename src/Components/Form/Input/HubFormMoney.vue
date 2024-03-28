<script setup lang="ts">
  import { useControl, Control } from '../../../Composables/UseControl';
  import { ref, computed, nextTick } from 'vue';

  defineOptions({
    name: 'HubFormMoney',
    inheritAttrs: false,
  });

  const emit = defineEmits([
    'update:modelValue',
  ]);

  const props = defineProps({
    ...Control,
    currency: { type: String, required: false },
    decimals: { type: Number, required: false },
  });

  const currency = computed(() => props.currency || __currency_code);
  const decimals = computed(() => props.decimals || __currency_decimals);
  const focused = ref(false);
  const htmlControl = ref();

  const type = computed(() => {
    return focused.value ? 'number' : 'text';
  });

  const formatter = computed(() => {
    return Intl.NumberFormat(__i18n_fallback, {
      style: 'currency',
      currency: currency.value,
      minimumFractionDigits: decimals.value,
      maximumFractionDigits: decimals.value,
    });
  });

  const { control, input, model } = useControl({ props, emit });

  const value = computed(() => {
    if (!focused.value) {
      if (model.value === null || model.value === undefined) {
        return '';
      } else {
        return formatter.value.format(model.value);
      }
    } else {
      return model.value;
    }
  });

  defineExpose({
    focus: () => htmlControl.value?.focus(),
    select: () => htmlControl.value?.select(),
  });

  function onFocus() {
    focused.value = true;
    nextTick(() => htmlControl.value?.select());
  }

  function onBlur() {
    focused.value = false;
  }

  function onInput(event: any) {
    model.value = event.target.value;
  }
</script>
<template>
  <HubFormControl v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
    <template v-slot:control>
      <input ref="htmlControl" class="numeric" v-bind="{ ...input, ...$attrs, type, value, onFocus, onBlur, onInput }" />
    </template>
  </HubFormControl>
</template>
