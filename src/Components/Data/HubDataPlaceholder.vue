<script setup lang="ts">
  defineProps({
    preview: { type: Boolean, required: false, default: false },
  });
</script>
<template>
  <div class="data-placeholder" :class="{ preview }">
    <slot>
      {{ $t('Brak wyników spełniających podane kryteria.') }}
    </slot>
  </div>
</template>
<style scoped lang="scss">
  .data-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    gap: 12px;
    padding: 32px;
    text-align: center;
    font-size: 12px;
    color: var(--themeNeutralAltForeground);
    border: 1px dashed var(--themeNeutralAltForeground);

    &.preview {
      padding: 4px;
      border-color: transparent;
    }
  }
</style>
