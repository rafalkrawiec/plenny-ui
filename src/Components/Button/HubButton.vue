<script setup lang="ts">
  import { computed, type PropType } from 'vue';
  import type { RouteLocationRaw } from 'vue-router';
  import { useComponentAppearance, AppearanceProps } from '../../Composables/UseComponentAppearance';
  import { useComponentSize, SizeProps } from '../../Composables/UseComponentSize';

  defineSlots<{
    before(props: { disabled: boolean }): any,
    default(props: { disabled: boolean }): any,
    after(props: { disabled: boolean }): any,
  }>();

  const props = defineProps({
    type: { type: String as PropType<'button' | 'submit'>, required: false, default: 'button' },
    to: { type: [String, Object] as PropType<RouteLocationRaw>, required: false },
    href: { type: String as PropType<string>, required: false },
    before: { type: String as PropType<string>, required: false },
    after: { type: String as PropType<string>, required: false },
    enabled: { type: Boolean as PropType<boolean>, required: false, default: true },
    disabled: { type: Boolean as PropType<boolean>, required: false, default: false },
    loading: { type: Boolean as PropType<boolean>, required: false, default: false },
    square: { type: Boolean as PropType<boolean>, required: false, default: false },
    ...AppearanceProps,
    ...SizeProps,
  });

  const { appearance } = useComponentAppearance(props);
  const { size } = useComponentSize(props);

  const component = computed(() => {
    if (props.to) {
      return 'router-link';
    }

    if (props.href) {
      return 'a';
    }

    return 'button';
  });

  const specific = computed(() => {
    if (props.to) {
      return { to: props.to };
    }

    if (props.href) {
      return { href: props.href };
    }

    return { type: props.type };
  });

  const disabled = computed(() => {
    return props.disabled || !props.enabled || props.loading;
  });
</script>
<template>
  <component :is="component" class="btn" :class="{ square, ...appearance, ...size }" v-bind="{ ...specific, disabled }">
    <span class="before" v-if="before || $slots.before">
      <slot name="before" v-bind="{ disabled }">
        <span class="icon" :class="before" />
      </slot>
    </span>
    <span class="inner" v-if="$slots.default">
      <slot v-bind="{ disabled }" />
    </span>
    <span class="after" v-if="after || $slots.after">
      <slot name="after" v-bind="{ disabled }">
        <span class="icon" :class="after" />
      </slot>
    </span>
    <span class="spinner-wrapper" v-if="loading">
      <HubSpinner v-bind="{ ...appearance, ...size }" />
    </span>
  </component>
</template>
<style>
  :root {
    --v-btn-color: var(--themeNeutralForeground);
    --v-btn-color-hover: var(--themeNeutralForegroundHover);
    --v-btn-color-active: var(--themeNeutralForegroundActive);
    --v-btn-color-focus: var(--themeNeutralForegroundFocus);
    --v-btn-color-disabled: var(--themeDisabledForeground);
    --v-btn-border: var(--themeNeutralBorder);
    --v-btn-border-hover: var(--themeNeutralBorderHover);
    --v-btn-border-active: var(--themeNeutralBorderActive);
    --v-btn-border-focus: var(--themeNeutralBorderFocus);
    --v-btn-border-disabled: var(--themeDisabledBorder);
    --v-btn-background: var(--themeNeutralLightBackground);
    --v-btn-background-hover: var(--themeNeutralLightBackgroundHover);
    --v-btn-background-active: var(--themeNeutralLightBackgroundActive);
    --v-btn-background-focus: var(--themeNeutralLightBackgroundFocus);
    --v-btn-background-disabled: var(--themeDisabledBackground);
    --v-btn-content-align: flex-start;
    --v-btn-box-shadow: var(--themeShadowNeutralColorAlt) 0px 1px 1px;
  }
</style>
<style scoped lang="scss">
  .btn {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    flex-direction: row;
    justify-content: var(--v-btn-content-align);
    align-items: center;
    min-width: 0;
    height: 32px;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;
    font-weight: 600;
    color: var(--v-btn-color);
    box-shadow: var(--v-btn-box-shadow);
    background-color: var(--v-btn-background);
    border: 1px solid var(--v-btn-border);
    border-radius: 4px;
    padding: 5px 12px;
    column-gap: 6px;
    cursor: pointer;
    transition-timing-function: var(--v-curve-easy-ease);
    transition-property: background, border, color;
    transition-duration: var(--v-duration-faster);
    outline: none;

    &:focus {
      color: var(--v-btn-color-focus);
      border-color: var(--v-btn-border-focus);
      background-color: var(--v-btn-background-focus);
    }

    &:active {
      color: var(--v-btn-color-active);
      border-color: var(--v-btn-border-active);
      background-color: var(--v-btn-background-active);
    }

    &:hover {
      color: var(--v-btn-color-hover);
      border-color: var(--v-btn-border-hover);
      background-color: var(--v-btn-background-hover);
    }

    &:disabled {
      cursor: not-allowed;
      color: var(--v-btn-color-disabled);
      border-color: var(--v-btn-border-disabled);
      background-color: var(--v-btn-background-disabled);
    }

    &.primary {
      --v-btn-color: var(--themePrimaryForeground);
      --v-btn-color-hover: var(--themePrimaryForegroundHover);
      --v-btn-color-active: var(--themePrimaryForegroundActive);
      --v-btn-color-focus: var(--themePrimaryForegroundFocus);
      --v-btn-border: transparent;
      --v-btn-border-hover: transparent;
      --v-btn-border-active: transparent;
      --v-btn-border-focus: transparent;
      --v-btn-background: var(--themePrimaryBackground);
      --v-btn-background-hover: var(--themePrimaryBackgroundHover);
      --v-btn-background-active: var(--themePrimaryBackgroundActive);
      --v-btn-background-focus: var(--themePrimaryBackgroundFocus);
      --v-spinner-primary-track-color: var(--themeBackdropBackground);
      --v-spinner-primary-tail-color: var(--themeWhite);
      --v-btn-box-shadow: var(--themeShadowPrimaryColorAlt) 0px 1px 1px;
    }

    &.danger {
      --v-btn-color: var(--colorPaletteRedForeground3);
      --v-btn-color-hover: var(--colorPaletteRedForeground2);
      --v-btn-color-active: var(--colorPaletteRedForeground2);
      --v-btn-color-focus: var(--colorPaletteRedForeground3);
    }

    &.transparent {
      --v-btn-border: transparent;
      --v-btn-border-hover: transparent;
      --v-btn-border-active: transparent;
      --v-btn-border-focus: transparent;
      --v-btn-border-disabled: transparent;
      --v-btn-background: transparent;
      --v-btn-background-disabled: transparent;
      --v-btn-box-shadow: none;
    }

    &.square {
      min-width: 32px;
      padding: 0 5px;
    }

    .before {
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .after {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid var(--themeNeutralBorder);
      margin-left: 12px;
      padding-left: 12px;
    }

    .inner {
      white-space: nowrap;
    }
  }

  .btn {
    &.smaller {
      padding: 2px 6px;
      height: 20px;
      font-size: 12px;
      line-height: 16px;

      &.square {
        min-width: 20px;
        padding: 2px 1px;
      }

      .icon {
        width: 16px;
        height: 16px;
        font-size: 16px;
      }
    }

    &.small {
      padding: 4px 12px;
      height: 24px;
      font-size: 12px;
      line-height: 16px;

      &.square {
        min-width: 24px;
        padding: 4px 3px;
      }

      .icon {
        width: 16px;
        height: 16px;
        font-size: 16px;
      }
    }

    &.medium {
      padding: 8px 16px;
      height: 40px;
      font-size: 16px;
      line-height: 24px;

      &.square {
        min-width: 40px;
        padding: 8px 7px;
      }

      .icon {
        width: 24px;
        height: 24px;
        font-size: 24px;
      }
    }

    &.large {
      padding: 10px 20px;
      height: 48px;
      font-size: 20px;
      line-height: 28px;

      &.square {
        min-width: 48px;
        padding: 10px 9px;
      }

      .icon {
        width: 28px;
        height: 28px;
        font-size: 28px;
      }
    }

    &.larger {
      padding: 12px 24px;
      height: 64px;
      font-size: 24px;
      line-height: 40px;

      &.square {
        min-width: 64px;
        padding: 12px 11px;
      }

      .icon {
        width: 40px;
        height: 40px;
        font-size: 40px;
      }
    }
  }

  .spinner-wrapper {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: var(--v-btn-background);
    border-radius: 4px;
  }
</style>
