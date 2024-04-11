<script setup lang="ts">
  import { useControl, Control } from '../../../Composables/UseControl';
  import { ref } from 'vue';

  defineOptions({
    name: 'HubFormInput',
    inheritAttrs: false,
  });

  defineSlots<{
    label(): any,
    above(): any,
    controlElement(): any,
    before(): any,
    after(): any,
    below(): any,
  }>();

  const props = defineProps({
    ...Control,
  });

  const htmlControl = ref();

  const emit = defineEmits(['update:modelValue']);
  const { control, input, model } = useControl({ props, emit });

  defineExpose({
    el: htmlControl,
    focus: () => htmlControl.value?.focus(),
    select: () => htmlControl.value?.select(),
  });
</script>
<template>
  <HubFormControl v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <!-- @vue-expect-error -->
      <slot :name="slot" v-bind="props" />
    </template>
    <template v-slot:control>
      <input ref="htmlControl" type="text" v-bind="{ ...input, ...$attrs }" v-model="model" />
    </template>
  </HubFormControl>
</template>
