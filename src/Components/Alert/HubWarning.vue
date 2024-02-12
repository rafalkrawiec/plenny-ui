<script setup lang="ts">
  import type { PropType } from 'vue';

  defineSlots<{
    default(): any;
    actions(): any;
  }>();

  defineProps({
    icon: { type: String as PropType<string>, required: false, default: 'warning-regular' },
  });
</script>
<template>
  <HubAlert warning :icon="icon">
    <template #default>
      <slot />
    </template>
    <template #actions v-if="$slots.actions">
      <slot name="actions" />
    </template>
  </HubAlert>
</template>
