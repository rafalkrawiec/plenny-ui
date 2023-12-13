<script setup lang="ts">
  import { useControl, Control } from '../../../Composables/UseControl';
  import { ref } from 'vue';
  import moment from 'moment';
  import 'moment-timezone';

  defineOptions({
    name: 'HubFormDateTime',
    inheritAttrs: false,
  });

  const emit = defineEmits([
    'update:modelValue',
  ]);

  const props = defineProps({
    ...Control,
    timezone: { type: String, required: false },
  });

  const htmlControl = ref();

  const { control, input, model } = useControl({
    props,
    emit,
    transform(value) {
      if (value) {
        return moment.tz(value, props.timezone || __app_timezone).local().format('YYYY-MM-DD HH:mm');
      } else {
        return value;
      }
    },
  });

  defineExpose({
    focus: () => htmlControl.value?.focus(),
    select: () => htmlControl.value?.select(),
  });
</script>
<template>
  <HubFormControl v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
    <template v-slot:control>
      <input ref="htmlControl" type="datetime-local" v-bind="{ ...input, ...$attrs }" v-model="model" />
    </template>
  </HubFormControl>
</template>
