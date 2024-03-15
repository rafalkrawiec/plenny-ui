<script setup lang="ts">
  import { provide, type PropType } from 'vue';
  import { FormContextKey } from '../../../DependencyInjection/Ui';
  import type { FormContext } from '../../../Composables/UseHubForm';

  defineSlots<{
    default(props: FormContext): any,
  }>();

  const props = defineProps({
    context: {
      type: Object as PropType<FormContext>,
      required: true,
    },
  });

  provide(FormContextKey, props.context);
  defineExpose(props.context);
</script>
<template>
  <form @submit.prevent="context.submit" class="form-wrapper" novalidate>
    <slot v-bind="context" />
  </form>
</template>
<style scoped lang="scss">
  .form-wrapper {
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
  }
</style>
