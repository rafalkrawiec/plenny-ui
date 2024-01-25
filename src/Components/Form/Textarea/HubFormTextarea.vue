<script setup lang="ts">
  import { useControl, Control } from '../../../Composables/UseControl';
  import { ref, onMounted } from 'vue';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    ...Control,
  });

  const htmlControl = ref();
  const emit = defineEmits(['update:modelValue']);

  const { control, input, model } = useControl({ props, emit });

  function resize() {
    htmlControl.value.style.height = '0px';
    htmlControl.value.style.height = htmlControl.value.scrollHeight + 'px';
  }

  onMounted(() => {
    resize();
  });
</script>
<template>
  <HubFormControl class="control-textarea" v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
    <template v-slot:control>
      <textarea ref="htmlControl" v-bind="{ ...input, ...$attrs }" v-model="model" @input="resize()" />
    </template>
  </HubFormControl>
</template>
<style lang="scss">
  .control-textarea {
    height: auto !important;

    textarea {
      resize: none;
      min-height: 20px;
    }
  }
</style>
