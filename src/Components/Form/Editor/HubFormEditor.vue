<script setup lang="ts">
  import { useControl, Control } from '../../../Composables/UseControl';
  import { ref } from 'vue';
  import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

  defineOptions({
    inheritAttrs: false,
  });

  const props = defineProps({
    ...Control,
  });

  const emit = defineEmits(['update:modelValue']);
  const editor = ref(ClassicEditor);

  const { control, input, model } = useControl({ props, emit });
</script>
<template>
  <HubFormControl class="control-textarea" v-bind="control">
    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
      <slot :name="slot" v-bind="props"/>
    </template>
    <template v-slot:controlElement>
      <div class="editor-wrapper">
        <ckeditor :editor="editor" v-model="model"/>
      </div>
    </template>
  </HubFormControl>
</template>
<style>
  :root {
    --ck-color-base-foreground: var(--v-control-wrapper-color) !important;
    --ck-color-base-background: var(--v-control-wrapper-background) !important;
    --ck-color-base-border: var(--v-control-wrapper-border) !important;
    --ck-color-base-action: var(--themeNeutralBackground) !important;
    --ck-color-base-focus: var(--themeNeutralBackgroundFocus) !important;
    --ck-color-base-text: var(--v-control-wrapper-color) !important;
    --ck-color-base-active: var(--themeNeutralBackgroundActive) !important;
    --ck-color-base-active-focus: var(--themeNeutralBackgroundFocus) !important;
    --ck-color-base-error: var(--themeDangerForeground) !important;
    --ck-border-radius: 4px !important;

    --ck-color-button-default-background: transparent;
    --ck-color-button-default-hover-background: var(--themeNeutralBackgroundHover) !important;
    --ck-color-button-default-active-background: var(--themeNeutralBackgroundActive) !important;
    --ck-color-button-default-disabled-background: var(--themeDisabledBackground) !important;
    --ck-color-button-on-background: var(--themeNeutralBackground) !important;
    --ck-color-button-on-hover-background: var(--themeNeutralBackgroundHover) !important;
    --ck-color-button-on-active-background: var(--themeNeutralBackgroundActive) !important;
    --ck-color-button-on-disabled-background: var(--themeDisabledBackground) !important;
    --ck-color-button-on-color: var(--themeNeutralForeground) !important;

    --ck-color-button-save: var(--themeSuccessForeground) !important;
    --ck-color-button-cancel: var(--themeDangerForeground) !important;
  }
</style>
<style scoped lang="scss">
  .editor-wrapper {
    border-radius: 4px;
    box-shadow: var(--v-control-wrapper-box-shadow);
  }
</style>
