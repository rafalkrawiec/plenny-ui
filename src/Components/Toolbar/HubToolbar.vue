<script setup lang="ts">
  import type { PropType } from 'vue';

  const props = defineProps({
    sticky: { type: Boolean as PropType<boolean>, required: false, default: false },
    top: { type: Boolean as PropType<boolean>, required: false, default: false },
    bottom: { type: Boolean as PropType<boolean>, required: false, default: false },
    transparent: { type: Boolean as PropType<boolean>, required: false, default: false },
  });
</script>
<template>
  <div class="toolbar" :class="{ sticky, top, bottom, transparent }">
    <slot />
  </div>
</template>
<style scoped lang="scss">
  .toolbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding: 15px 32px;
    background: var(--themeNeutralBackground);
    border-top: 1px solid transparent;
    border-bottom: 1px solid transparent;
    margin: 0 -32px;

    &:not(:first-child) {
      border-top: 1px solid var(--themeBackdropBorder);
    }

    &:not(:last-child) {
      border-bottom: 1px solid var(--themeBackdropBorder);
    }

    &.transparent {
      border-color: transparent !important;
    }

    &.sticky {
      position: sticky;
      z-index: 100;
    }

    &.top {
      top: 0;
    }

    &.bottom {
      bottom: 0;
    }

    :deep(h1), :deep(h2), :deep(h3), :deep(h4), :deep(h5) {
      margin-right: 32px;
    }
  }
</style>
