<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed, toValue } from 'vue';
  import type { RouteLocationRaw } from 'vue-router';

  defineSlots<{
    before(props: any): any;
    after(props: any): any;
  }>();

  const props = defineProps({
    to: {
      type: [String, Object, Function] as PropType<RouteLocationRaw | (() => RouteLocationRaw)>,
      required: false,
    },
    before: {
      type: String as PropType<string>,
      required: false,
    },
    after: {
      type: String as PropType<string>,
      required: false,
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  });

  const disabled = computed(() => {
    return props.disabled || !props.to;
  });

  const component = computed(() => {
    if (!disabled.value) {
      return 'router-link';
    }

    return 'span';
  });

  const specific = computed(() => {
    if (!disabled.value) {
      return { to: toValue(props.to) };
    } else {
      return {};
    }
  });
</script>
<template>
  <component :is="component" v-bind="specific" class="tab" :class="{ disabled }">
    <span class="before" v-if="before || $slots.before">
      <slot name="before">
        <span class="icon" :class="before" />
      </slot>
    </span>
    <span class="inner" v-if="$slots.default">
      <slot />
    </span>
    <span class="after" v-if="after || $slots.after">
      <slot name="before">
        <span class="icon" :class="after" />
      </slot>
    </span>
  </component>
</template>

<style scoped lang="scss">
  .tab {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-weight: var(--fontWeightBold);
    height: 44px;
    padding: 12px;
    font-size: 14px;
    line-height: 20px;
    vertical-align: middle;
    cursor: pointer;
    outline: none;
    color: var(--themeNeutralForeground);
    gap: 4px;

    &.router-link-active {
      color: var(--themeBlack);

      &::after {
        border-color: var(--themePrimaryBackground);
        transform: scaleX(1);
        transition-property: transform;
        transition-duration: var(--v-duration-normal);
        transition-delay: var(--v-curve-decelerate-mid);
      }
    }

    &:hover, &:focus {
      &::after {
        transform: scaleX(1);
        transition-property: transform;
        transition-duration: var(--v-duration-normal);
        transition-delay: var(--v-curve-decelerate-mid);
      }
    }

    &.disabled {
      cursor: not-allowed;
      pointer-events: none;
      color: var(--themeDisabledForeground);

      &:after {
        display: none;
      }
    }

    &::after {
      content: "";
      position: absolute;
      left: 12px;
      bottom: 0;
      right: 12px;
      height: 3px;
      border-bottom: 3px solid var(--themeNeutralBorder);
      border-radius: 3px;
      transform: scaleX(0);
      transition-property: transform;
      transition-duration: var(--v-duration-fast);
      transition-delay: var(--v-curve-accelerate-mid);
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
    }

    .inner {
      white-space: nowrap;
    }
  }
</style>
