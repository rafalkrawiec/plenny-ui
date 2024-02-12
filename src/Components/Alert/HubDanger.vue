<script setup lang="ts">
  import type { PropType } from 'vue';

  defineSlots<{
    default(): any;
    actions(): any;
  }>();

  defineProps({
    icon: { type: String as PropType<string>, required: false, default: 'error-circle-regular' },
  });
</script>
<template>
  <HubAlert danger :icon="icon">
    <template #default>
      <slot />
    </template>
    <template #actions v-if="$slots.actions">
      <slot name="actions" />
    </template>
  </HubAlert>
</template>
