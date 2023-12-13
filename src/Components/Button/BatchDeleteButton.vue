<script setup lang="ts">
  defineProps({
    selected: { type: Array, required: true },
  });
</script>
<template>
  <HubButton before="delete-regular" danger :disabled="selected.length <= 0">
    {{ $t('Usuń wybrane') }}
    <HubBadge v-if="selected.length > 0" danger>
      {{ selected.length }}
    </HubBadge>
  </HubButton>
</template>
