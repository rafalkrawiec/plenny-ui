<script setup lang="ts">
  import HubDialog from '../Dialog/HubDialog.vue';
  import HubSpinner from './HubSpinner.vue';
  import type { PropType } from 'vue';

  defineProps({
    open: { type: Boolean as PropType<boolean>, required: false, default: false },
  });
</script>
<template>
  <HubDialog :open="open">
    <div class="loader-dialog">
      <HubSpinner larger primary />
      <slot />
    </div>
  </HubDialog>
</template>
<style scoped lang="scss">
  .loader-dialog {
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }
</style>
