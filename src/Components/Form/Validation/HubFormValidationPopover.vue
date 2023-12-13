<script setup lang="ts">
  import { useControlErrors } from '../../../Composables/UseControlErrors';
  import type { PropType } from 'vue';

  const props = defineProps({
    name: { type: String as PropType<string>, required: false, default: null },
    initial: { type: Array as PropType<string[]>, required: false, default: [] },
  });

  const { hasErrors } = useControlErrors(props);
</script>
<template>
  <HubPopover v-if="hasErrors">
    <template #trigger>
      <span class="icon error-circle-regular error"/>
    </template>
    <HubFormValidation :name="name" :initial="initial"/>
  </HubPopover>
</template>
<style lang="scss" scoped>
  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    font-size: 20px;
    line-height: 20px;

    &.error {
      color: var(--themeDangerForeground);
    }
  }
</style>
