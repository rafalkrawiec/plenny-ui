<script setup lang="ts">
  import { useComponentAppearance, AppearanceProps } from '../../Composables/UseComponentAppearance';
  import { useComponentSize, SizeProps } from '../../Composables/UseComponentSize';

  const props = defineProps({
    ...AppearanceProps,
    ...SizeProps,
  });

  const { appearance } = useComponentAppearance(props);
  const { size } = useComponentSize(props);
</script>
<template>
  <svg class="spinner" :class="{ ...appearance, ...size }">
    <circle class="track"/>
    <circle class="tail"/>
  </svg>
</template>
<style>
  :root {
    --v-spinner-size: 20px;
    --v-spinner-radius: 9px;
    --v-spinner-stroke: 2px;
    --v-spinner-track-color: var(--colorPalettePlatinumBackground2);
    --v-spinner-tail-color: var(--colorPalettePlatinumForeground2);
    --v-spinner-primary-track-color: var(--themePrimaryBackground);
    --v-spinner-primary-tail-color: var(--themePrimaryLightBorder);
  }
</style>
<style scoped lang="scss">
  .spinner {
    display: inline-block;
    width: var(--v-spinner-size);
    height: var(--v-spinner-size);
    background-color: transparent;
    animation-name: spinner-rotate;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 3s;
    overflow-clip-margin: content-box;
    overflow: hidden;

    &.primary {
      --v-spinner-track-color: var(--v-spinner-primary-track-color);
      --v-spinner-tail-color: var(--v-spinner-primary-tail-color);
    }

    &.smaller, &.small {
      --v-spinner-size: 16px;
      --v-spinner-radius: 6px;
      --v-spinner-stroke: 2px;
    }

    &.medium {
      --v-spinner-size: 24px;
      --v-spinner-radius: 10.5px;
      --v-spinner-stroke: 3px;
    }

    &.large {
      --v-spinner-size: 28px;
      --v-spinner-radius: 12px;
      --v-spinner-stroke: 4px;
    }

    &.larger {
      --v-spinner-size: 40px;
      --v-spinner-radius: 18px;
      --v-spinner-stroke: 4px;
    }

    .track {
      r: var(--v-spinner-radius);
      stroke: var(--v-spinner-track-color);
      stroke-width: var(--v-spinner-stroke);
      fill: none;
      cx: 50%;
      cy: 50%;
    }

    .tail {
      r: var(--v-spinner-radius);
      stroke: var(--v-spinner-tail-color);
      stroke-width: var(--v-spinner-stroke);
      fill: none;
      cx: 50%;
      cy: 50%;
      transform-origin: 50% 50%;
      stroke-linecap: round;
      animation-name: spinner-stroke;
      animation-timing-function: var(--v-curve-easy-ease);
      animation-iteration-count: infinite;
      animation-duration: 1.5s;
    }
  }

  @keyframes spinner-rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spinner-stroke {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
</style>
