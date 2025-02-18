<script lang="ts">
  export type DialogContext = {
    show: () => void;
    hide: () => void;
    activate: () => void;
    deactivate: () => void;
  }
</script>
<script setup lang="ts">
  import { watch, ref, nextTick, onMounted, computed, type PropType, provide } from 'vue';

  import { useDialogFocusTrap } from './Composables/UseDialogFocusTrap';
  import { useComponentSize, SizeProps } from '../../Composables/UseComponentSize';
  import { DialogContextKey } from '../../DependencyInjection/Ui';

  const emit = defineEmits([
    'update:open',
    'modal:visible',
    'modal:hidden',
  ]);

  const props = defineProps({
    open: { type: Boolean as PropType<boolean>, required: false, default: false },
    ...SizeProps,
  });

  const htmlDialog = ref();

  const open = computed({
    get: () => props.open,
    set: (value) => emit('update:open', value),
  });

  watch(open, () => {
    if (open.value) {
      show();
    } else {
      hide();
    }
  });

  const { activate, deactivate } = useDialogFocusTrap(htmlDialog);
  const { size } = useComponentSize(props);

  function show() {
    open.value = true;

    nextTick(() => {
      emit('modal:visible');
      // activate();
    });
  }

  function hide() {
    // deactivate();
    open.value = false;

    nextTick(() => {
      emit('modal:hidden');
    });
  }

  onMounted(() => {
    if (open.value) {
      show();
    }
  });

  defineExpose({
    show,
    hide,
    activate,
    deactivate,
  });

  provide(DialogContextKey, {
    show,
    hide,
    activate,
    deactivate,
  });
</script>
<template>
  <teleport to="body">
    <transition name="dialog">
      <div v-if="open" class="dialog">
        <div class="dialog-backdrop" />
        <div ref="htmlDialog" class="dialog-viewport" tabindex="-1" @keydown.esc="hide">
          <div class="dialog-viewport-wrapper">
            <div class="dialog-container" :class="{ ...size }">
              <div class="dialog-content">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>
<style scoped lang="scss">
  .dialog {
    display: contents;
  }

  .dialog-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-color: var(--themeBackdropBackground);
    z-index: 1000;
  }

  .dialog-viewport {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog-viewport-wrapper {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
    padding: var(--size32);
  }

  .dialog-container {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    max-width: 992px;
    min-width: 0;
    min-height: 0;
    padding: 0 32px;
    background-color: var(--themeNeutralBackground);
    box-shadow: var(--neutralShadow64);
    border-radius: 8px;

    &.smaller {
      max-width: 564px;
    }

    &.small {
      max-width: 768px;
    }

    &.large {
      max-width: 1200px;
    }

    &.larger {
      max-width: 1400px;
    }
  }

  .dialog-content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    min-height: 0;

    :deep(.toolbar) {
      &:first-child {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }

      &:last-child {
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
    }
  }

  .dialog-enter-from,
  .dialog-leave-to {
    .dialog-backdrop {
      opacity: 0;
    }

    .dialog-container {
      opacity: 0;
      transform: translateY(20%);
    }
  }

  .dialog-enter-active,
  .dialog-leave-active {
    transition-duration: var(--v-duration-fast);

    .dialog-backdrop {
      transition-property: opacity;
      transition-duration: var(--v-duration-fast);
      transition-timing-function: var(--v-curve-easy-ease);
    }

    .dialog-container {
      transition-property: opacity, transform;
      transition-duration: var(--v-duration-fast);
      transition-timing-function: var(--v-curve-easy-ease);
    }
  }
</style>
