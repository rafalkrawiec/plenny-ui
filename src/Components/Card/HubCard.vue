<script setup lang="ts">
  import { computed, type PropType, ref } from 'vue';
  import HubFormCheckbox from '../Form/Checkbox/HubFormCheckbox.vue';
  import HubFormRadio from '../Form/Radio/HubFormRadio.vue';
  import { AppearanceProps, useComponentAppearance } from '../../Composables/UseComponentAppearance';

  const props = defineProps({
    ...AppearanceProps,
    selectable: { type: Boolean as PropType<boolean>, required: false, default: false },
    horizontal: { type: Boolean as PropType<boolean>, required: false, default: false },
    subtle: { type: Boolean as PropType<boolean>, required: false, default: false },
    preview: { type: Boolean as PropType<boolean>, required: false, default: false },
    multiple: { type: Boolean as PropType<boolean>, required: false, default: true },
    value: { type: [String, Number] as PropType<string | number>, required: false },
    modelValue: { type: [String, Number, Array] as PropType<string | number | string[] | number[]>, required: false },
  });

  const emit = defineEmits([
    'update:modelValue',
  ]);

  const cardHtmlElement = ref();
  const vertical = computed(() => !props.horizontal);
  const { appearance } = useComponentAppearance(props);

  const model = computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  });

  const checkComponent = computed(() => {
    return props.multiple ? HubFormCheckbox : HubFormRadio;
  });

  function handleSelectableCardClick() {
    if (props.selectable) {
      cardHtmlElement.value.querySelector('.card-select-control').click();
    }
  }
</script>
<template>
  <div ref="cardHtmlElement" class="card" :class="{ selectable, horizontal, vertical, subtle, preview, ...appearance }" @click="handleSelectableCardClick">
    <slot />
    <div class="card-selector" v-if="selectable" @click.stop="void 0">
      <component class="card-select-control" :is="checkComponent" :value="value" v-model="model" />
    </div>
  </div>
</template>
<style>
  :root {
    --card-size: 12px;
    --card-theme-title: var(--themeBlack);
    --card-theme-subtitle: var(--themeNeutralAltForeground);
    --card-theme-background: var(--themeNeutralLightBackground);
    --card-theme-color: var(--themeNeutralForeground);
  }
</style>
<style scoped lang="scss">
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--card-size);
    background-color: var(--card-theme-background);
    color: var(--card-theme-color);
    border-radius: 8px;
    padding: var(--card-size);
    box-shadow: var(--v-shadow-neutral-4);
    width: 100%;

    &.horizontal {
      flex-direction: row;
      align-items: center;
    }

    &.subtle, &.transparent {
      box-shadow: none;
      background-color: transparent;
      border-radius: 0;
      padding: 0;
    }

    &.warning {
      --card-theme-title: var(--colorPaletteYellowForeground2);
      --card-theme-subtitle: var(--colorPaletteYellowForeground2);
      --card-theme-background: var(--colorPaletteYellowBackground2);
      --card-theme-color: var(--colorPaletteYellowForeground2);
    }

    &.preview {
      box-shadow: none;
      background-color: transparent;
      border-radius: 0;

      &:hover {
        :deep(.card-header) {
          opacity: 1;
          transform: translateY(0);
        }
      }

      :deep(.card-header) {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 58px;
        padding: 8px;
        background-color: rgb(255 255 255 / 0.75);
        backdrop-filter: blur(4px);
        opacity: 0;
        transform: translateY(29px);
        transition-property: opacity, background-color, transform;
        transition-duration: var(--v-duration-slow);
        transition-timing-function: var(--v-curve-easy-ease);
      }

      &.vertical, &.horizontal {
        :deep(.card-preview) {
          &, & img {
            aspect-ratio: auto;
          }
        }
      }
    }

    &.large {
      --card-size: var(--size20);
    }

    &.larger {
      --card-size: var(--size32);
    }
  }

  .card {
    .card-selector {
      position: absolute;
      top: var(--card-size);
      right: var(--card-size);
      opacity: 0;
      transition-timing-function: var(--v-curve-easy-ease);
      transition-duration: var(--v-duration-faster);
      transition-property: opacity;
    }

    &:hover {
      .card-selector {
        opacity: 1;
      }
    }
  }

  .card {
    &.dragging {
      outline: 2px dashed var(--themePrimaryBorder);
      outline-offset: 2px;
    }

    &.drop-inside {
      outline: 2px dotted var(--themeSuccessForeground);
      outline-offset: 2px;
    }
  }

  .card {
    &.selectable {
      &:hover {
        :deep(.card-preview) {
          &:after {
            background-position: 0 0;
          }
        }
      }
    }

    &.vertical {
      :deep(.card-preview) {
        margin-left: calc(var(--card-size) * -1);
        margin-right: calc(var(--card-size) * -1);
        aspect-ratio: 16 / 9;

        &:first-child {
          margin-top: calc(var(--card-size) * -1);

          &, &:after, img {
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
          }
        }

        &:last-child {
          margin-bottom: calc(var(--card-size) * -1);

          &, &:after, img {
            border-bottom-left-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }

        img {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-position: center;
          object-fit: cover;
        }
      }

      &.preview {
        :deep(.card-preview) {
          margin: calc(var(--card-size) * -1);

          &, img {
            border-radius: 0;
          }
        }
      }
    }

    &.horizontal {
      &.preview {
        :deep(.card-preview) {
          margin: calc(var(--card-size) * -1);

          &, img {
            border-radius: 0;
          }
        }
      }

      :deep(.card-preview) {
        margin-top: calc(var(--card-size) * -1);
        margin-bottom: calc(var(--card-size) * -1);
        aspect-ratio: 1 / 1;

        &:first-child {
          margin-left: calc(var(--card-size) * -1);

          &, img {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
          }
        }

        &:last-child {
          margin-right: calc(var(--card-size) * -1);

          &, img {
            border-top-right-radius: 8px;
            border-bottom-right-radius: 8px;
          }
        }

        img {
          height: 100%;
          aspect-ratio: 1 / 1;
          object-position: center;
          object-fit: cover;
        }
      }
    }
  }
</style>
