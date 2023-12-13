<script setup lang="ts">
  import { useControl, Control } from '../../../Composables/UseControl';
  import { ref } from 'vue';

  defineOptions({
    name: 'HubFormInput',
    inheritAttrs: false,
  });

  const props = defineProps({
    ...Control,
  });

  const htmlControl = ref();

  const emit = defineEmits(['update:modelValue']);
  const { control, input, model } = useControl({ props, emit });

  defineExpose({
    focus: () => htmlControl.value?.focus(),
    select: () => htmlControl.value?.select(),
  });
</script>
<template>
  <HubFormControl v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props"/>
    </template>
    <template v-slot:control>
      <input ref="htmlControl" type="text" v-bind="{ ...input, ...$attrs }" v-model="model"/>
    </template>
  </HubFormControl>
</template>
