<script setup lang="ts">
  import { watch, ref, nextTick, onMounted, computed, type PropType } from 'vue';

  import { useDialogFocusTrap } from './Composables/UseDialogFocusTrap';
  import { useComponentSize, SizeProps } from '../../Composables/UseComponentSize';

  const emit = defineEmits([
    'update:open',
    'modal:visible',
    'modal:hidden',
  ]);

  const props = defineProps({
    open: { type: Boolean as PropType<boolean>, required: false, default: false },
    full: { type: Boolean as PropType<boolean>, required: false, default: false },
    ...SizeProps,
  });

  const htmlDrawer = ref(null);

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

  const { activate, deactivate } = useDialogFocusTrap(htmlDrawer);
  const { size } = useComponentSize(props);

  function show() {
    open.value = true;

    nextTick(() => {
      emit('modal:visible');
      activate();
    });
  }

  function hide() {
    deactivate();
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

  defineExpose({ show, hide });
</script>
<template>
  <teleport to="body">
    <transition name="drawer">
      <div v-if="open" class="drawer">
        <div class="drawer-backdrop" />
        <div ref="htmlDrawer" class="drawer-viewport" role="dialog" tabindex="-1" @keydown.esc="hide">
          <div class="drawer-viewport-wrapper">
            <div class="drawer-container" :class="{ ...size, full }">
              <div class="drawer-content">
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
  .drawer {
    display: contents;
  }

  .drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    background-color: var(--themeBackdropBackground);
    z-index: 1000;
  }

  .drawer-viewport {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100dvh;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .drawer-viewport-wrapper {
    flex: 1 1 auto;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: row;
    width: 100%;
  }

  .drawer-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    width: 100%;
    max-width: 992px;
    min-width: 0;
    min-height: 100vh;
    padding: 0 32px;
    background-color: var(--themeNeutralBackground);
    box-shadow: var(--neutralShadow64);

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

    &.full {
      width: 100%;
      max-width: 100%;
    }
  }

  .drawer-content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    min-height: 0;
  }

  .drawer-enter-from,
  .drawer-leave-to {
    .drawer-backdrop {
      opacity: 0;
    }

    .drawer-container {
      opacity: 0;
      transform: translateX(50%);
    }
  }

  .drawer-enter-active,
  .drawer-leave-active {
    transition-duration: var(--v-duration-fast);

    .drawer-backdrop {
      transition-property: opacity;
      transition-duration: var(--v-duration-fast);
      transition-timing-function: var(--v-curve-easy-ease);
    }

    .drawer-container {
      transition-property: opacity, transform;
      transition-duration: var(--v-duration-fast);
      transition-timing-function: var(--v-curve-easy-ease);
    }
  }
</style>
