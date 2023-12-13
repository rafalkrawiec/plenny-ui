<script setup lang="ts">
  import type { PropType } from 'vue';
  import { useComponentAppearance, AppearanceProps } from '../../Composables/UseComponentAppearance';
  import HubButtonGroup from '../Button/HubButtonGroup.vue';

  const props = defineProps({
    icon: { type: String as PropType<string>, required: false },
    ...AppearanceProps,
  });

  const { appearance } = useComponentAppearance(props);
</script>
<template>
  <div class="alert" :class="{ ...appearance }">
    <div class="alert-icon" v-if="icon">
      <span class="icon" :class="icon" />
    </div>
    <div class="alert-content">
      <slot />
    </div>
    <div v-if="$slots.actions" class="alert-actions">
      <HubButtonGroup reversed>
        <slot name="actions" />
      </HubButtonGroup>
    </div>
  </div>
</template>
<style scoped lang="scss">
  .alert {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 8px;
    background-color: var(--themeNeutralBackground);
    border-left: 2px solid var(--themeNeutralLightBorder);
    border-radius: 4px;
    color: var(--themeNeutralAltForeground);
    padding: 8px 12px;
    margin-top: 4px;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: var(--fontWeightRegular);

    &.info {
      background-color: var(--colorPaletteBlueBackground1);
      border-color: var(--colorPaletteBlueBorder1);
      color: var(--colorPaletteBlueForeground1);
    }

    &.success {
      background-color: var(--colorPaletteLightGreenBackground1);
      border-color: var(--colorPaletteLightGreenBorder1);
      color: var(--colorPaletteLightGreenForeground1);
    }

    &.warning {
      background-color: var(--colorPaletteYellowBackground1);
      border-color: var(--colorPaletteYellowBorder1);
      color: var(--colorPaletteYellowForeground1);
    }

    &.danger {
      background-color: var(--colorPaletteRedBackground1);
      border-color: var(--colorPaletteRedBorder1);
      color: var(--colorPaletteRedForeground1);
    }

    &.severe {
      background-color: var(--colorPaletteMarigoldBackground1);
      border-color: var(--colorPaletteMarigoldBorder1);
      color: var(--colorPaletteMarigoldForeground1);
    }

    .alert-icon {
      flex: 0 0 20px;
      width: 20px;

      .icon {
        height: 32px;
      }
    }

    .alert-content {
      flex: 1 1 auto;
      line-height: 20px;
      padding: 6px 0;
    }

    .alert-actions {
      flex: 0 1 auto;
    }
  }
</style>
