<script setup lang="ts">
  import { useControl, Control } from '../../../Composables/UseControl';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    ...Control,
  });

  const emit = defineEmits(['update:modelValue']);
  const { control, input, model } = useControl({ props, emit });
</script>
<template>
  <HubFormControl v-bind="{ control }">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
    <template v-slot:controlElement>
      <label class="control-radio">
        <input type="radio" v-bind="{ ...input, ...$attrs }" :value="value" v-model="model" />
        <span class="indicator">
          <span class="icon checkmark-filled" />
        </span>
        <span v-if="label" class="description">
          {{ label }}
        </span>
        <HubFormValidationPopover :name="name" />
      </label>
    </template>
  </HubFormControl>
</template>

<style lang="scss" scoped>

</style>
