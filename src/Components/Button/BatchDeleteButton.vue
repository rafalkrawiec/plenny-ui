<script setup lang="ts">
  defineProps({
    selected: { type: Array, required: true },
  });
</script>
<template>
  <HubButton before="delete-regular" danger :disabled="selected.length <= 0" v-slot="{ disabled }">
    <slot name="default" v-bind="{ disabled }">
      {{ $t('Usuń wybrane') }}
    </slot>
    <HubBadge v-if="!disabled && selected.length > 0" danger>
      {{ selected.length }}
    </HubBadge>
  </HubButton>
</template>
