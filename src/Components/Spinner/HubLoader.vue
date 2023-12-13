<script setup lang="ts">
  defineProps({
    preview: { type: Boolean, required: false, default: false },
  });
</script>
<template>
  <div class="loading" :class="{ preview }">
    <HubSpinner primary />
    <slot v-if="!preview">{{ $t('Wczytywanie danych...') }}</slot>
  </div>
</template>
<style lang="scss" scoped>
  .loading {
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 32px;
    gap: 16px;
    max-width: 100%;

    &.preview {
      padding: 4px;
    }
  }
</style>
