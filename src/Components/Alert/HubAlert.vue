<script setup lang="ts">
  import { useComponentAppearance, AppearanceProps } from '../../Composables/UseComponentAppearance';
  import HubButtonGroup from '../Button/HubButtonGroup.vue';

  defineSlots<{
    default(): any;
    actions(): any;
  }>();

  const props = defineProps({
    ...AppearanceProps,
    icon: { type: String, required: false },
    square: { type: Boolean, required: false, default: false },
  });

  const { appearance } = useComponentAppearance(props);
</script>
<template>
  <div class="alert" :class="{ ...appearance, square }">
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
    background-color: var(--themeNeutralAltBackground);
    color: var(--themeNeutralAltForeground);
    border: 1px solid var(--themeNeutralAltBorder);
    border-radius: 4px;
    padding: 8px 12px;
    font-size: 12px;
    font-weight: var(--fontWeightRegular);

    &.square {
      border-radius: 0;
    }

    &.info {
      background-color: var(--themeNeutralAltBackground);
      border-color: var(--themeNeutralAltBorder);
      color: var(--themeNeutralAltForeground);
    }

    &.success {
      background-color: var(--colorStatusSuccessBackground1);
      border-color: var(--colorStatusSuccessBorder1);
      color: var(--colorStatusSuccessForeground1);
    }

    &.warning {
      background-color: var(--colorStatusWarningBackground1);
      border-color: var(--colorStatusWarningBorder1);
      color: var(--colorStatusWarningForeground1);
    }

    &.danger {
      background-color: var(--colorStatusDangerBackground1);
      border-color: var(--colorStatusDangerBorder1);
      color: var(--colorStatusDangerForeground1);
    }

    &.severe {
      background-color: var(--colorStatusWarningBackground2);
      border-color: var(--colorStatusWarningBorder2);
      color: var(--colorStatusWarningForeground2);
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
