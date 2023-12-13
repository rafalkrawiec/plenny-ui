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
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="drawer-backdrop" />
    </Transition>
    <Transition name="slide-right">
      <div v-if="open" ref="htmlDrawer" class="drawer" @keydown.esc="hide" tabindex="-1">
        <div class="drawer-viewport">
          <div class="drawer-viewport-wrapper">
            <div class="drawer-container" :class="{ ...size }">
              <div class="drawer-content">
                <slot />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped lang="scss">
  .drawer-backdrop {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100dvh;
    background-color: var(--themeBackdropBackground);
    z-index: 1000;
  }

  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100dvh;
    outline: none;
    z-index: 1000;
  }

  .drawer-viewport {
    width: 100%;
    height: 100dvh;
    min-height: 0;
    overflow-y: auto;
  }

  .drawer-viewport-wrapper {
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    flex-direction: column;
    width: 100%;
    min-height: 100dvh;
  }

  .drawer-container {
    display: flex;
    flex-direction: row;
    flex: 1 1 auto;
    width: 100%;
    min-height: 0;
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
  }

  .drawer-content {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: 32px;
    width: 100%;
    min-height: 0;
  }
</style>
