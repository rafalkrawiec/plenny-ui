<script setup lang="ts">
  import { useControl, Control } from '../../../Composables/UseControl';
  import { ColorPalette } from '../../../Utils/ColorPalette';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    ...Control,
  });

  const emit = defineEmits(['update:modelValue']);

  const { control, model } = useControl({ props, emit, except: ['id', 'name'] });
</script>
<template>
  <HubFormControl v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props" />
    </template>
    <template v-slot:controlElement>
      <div class="color-palette">
        <div v-for="color in Object.values(ColorPalette)"
          class="color" :class="{selected: color === model}"
          @click="model = color"
          @keydown.space.prevent.stop="model = color"
          tabindex="0"
        >
          <HubAvatar initials="AB" :color="color" />
        </div>
      </div>
    </template>
  </HubFormControl>
</template>
<style scoped lang="scss">
  .color-palette {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(32px, 1fr));
    gap: var(--size8);
    margin-top: var(--size4);
    margin-bottom: var(--size4);

    .color {
      cursor: pointer;
      outline: none;

      &.selected {
        :deep(.avatar) {
          box-shadow: 0 0 0 var(--size2) var(--themeNeutralBackground), 0 0 0 var(--size4) var(--themePrimaryBorderActive);
        }
      }

      &:focus {
        :deep(.avatar) {
          box-shadow: 0 0 0 var(--size2) var(--themeNeutralBackground), 0 0 0 var(--size4) var(--themePrimaryBorderFocus);
        }
      }
    }
  }
</style>
