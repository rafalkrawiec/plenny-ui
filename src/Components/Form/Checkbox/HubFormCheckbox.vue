<script setup lang="ts">
  import { useControl, Control } from '../../../Composables/UseControl';
  import HubFormControl from '../Control/HubFormControl.vue';
  import HubFormValidationPopover from '../Validation/HubFormValidationPopover.vue';
  import { ref } from 'vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    ...Control,
    defaultValue: { required: false, default: false },
  });

  const htmlControl = ref();

  const emit = defineEmits(['update:modelValue']);
  const { control, input, model } = useControl({ props, emit, except: ['label'] });

  defineExpose({
    focus: () => htmlControl.value?.focus(),
  });
</script>
<template>
  <HubFormControl v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
    <template v-slot:controlElement>
      <label class="control-checkbox">
        <input ref="htmlControl" type="checkbox" v-bind="{ ...input, ...$attrs }" :value="value" v-model="model" />
        <span class="indicator">
          <span class="icon checkmark-filled" />
        </span>
        <span v-if="label" class="description" v-html="label" />
        <HubFormValidationPopover :name="name" />
      </label>
    </template>
  </HubFormControl>
</template>
