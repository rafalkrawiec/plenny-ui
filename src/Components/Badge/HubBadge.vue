<script setup lang="ts">
  import { useComponentAppearance, AppearanceProps } from '../../Composables/UseComponentAppearance';

  const props = defineProps({
    ...AppearanceProps,
  });

  const { appearance } = useComponentAppearance(props);
</script>
<template>
  <span class="badge" :class="{ ...appearance }">
    <slot/>
  </span>
</template>
<style scoped lang="scss">
  .badge {
    position: absolute;
    top: -8px;
    left: calc(100% - 12px);
    height: 16px;
    line-height: 16px;
    font-size: 10px;
    border-radius: 8px;
    padding: 0 8px;
    background-color: var(--themeNeutralLightBackground);
    color: var(--themeNeutralAltForeground);
    box-shadow: var(--neutralShadow4);

    &.info {
      color: var(--colorPaletteBlueBackground1);
      background-color: var(--colorPaletteBlueForeground1);
    }

    &.success {
      color: var(--colorPaletteLightGreenBackground1);
      background-color: var(--colorPaletteLightGreenForeground1);
    }

    &.warning {
      color: var(--colorPaletteYellowBackground1);
      background-color: var(--colorPaletteYellowForeground1);
    }

    &.danger {
      color: var(--colorPaletteRedBackground1);
      background-color: var(--colorPaletteRedForeground1);
    }
  }
</style>
