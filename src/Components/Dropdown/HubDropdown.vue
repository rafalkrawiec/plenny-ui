<script setup lang="ts">
  import { ref, nextTick, provide, inject } from 'vue';
  import { useFloating, shift, size, offset, flip } from '@floating-ui/vue';
  import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
  import { onClickOutside } from '@vueuse/core';
  import HubButton from '../Button/HubButton.vue';

  const parent = inject('app-dropdown', null);

  const nested = ref(!!parent);
  const open = ref(false);

  const htmlTrigger = ref<HTMLDivElement>();
  const htmlList = ref<HTMLDivElement>();

  const { floatingStyles } = useFloating(htmlTrigger, htmlList, {
    placement: nested.value ? 'right-start' : 'bottom-start',
    middleware: [
      offset(5),
      flip(),
      shift({
        crossAxis: true,
      }),
      size({
        apply({ availableWidth, rects }) {
          Object.assign(htmlList.value!.style, {
            minWidth: `${rects.reference.width}px`,
            maxWidth: `${availableWidth}px`,
          });
        },
      }),
    ],
  });

  const { activate, deactivate } = useFocusTrap(htmlList, {
    allowOutsideClick: true,  // Dropdown should close when clicked outside list.
    escapeDeactivates: false, // We handle keyboard events ourselves.
  });

  onClickOutside(htmlList, () => {
    hide();
  });

  const toggle = () => {
    if (open.value) {
      hide();
    } else {
      show();
    }
  };

  const hide = () => {
    deactivate();
    open.value = false;
  };

  const show = () => {
    open.value = true;

    nextTick(() => {
      activate();
    });
  };

  const api = { open, nested, toggle, hide, show };

  defineSlots<{
    trigger(props: typeof api): any,
    default(props: {}): any,
  }>();

  provide('app-dropdown', api);
  defineExpose(api);
</script>
<template>
  <span class="dropdown" ref="htmlTrigger" @click.prevent.stop="toggle">
    <slot name="trigger" v-bind="api">
      <HubButton square transparent before="more-horizontal-regular" />
    </slot>
  </span>
  <Teleport to="body">
    <Transition name="dropdown">
      <div v-if="open" ref="htmlList" class="dropdown-list" tabindex="-1" v-bind:style="floatingStyles"
        @keydown.esc="hide" @click="hide">
        <slot />
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped lang="scss">
  .dropdown {
    cursor: pointer;
  }

  .dropdown-list {
    --v-btn-border: transparent;
    --v-btn-border-hover: transparent;
    --v-btn-border-active: transparent;
    --v-btn-border-focus: transparent;
    --v-btn-content-align: flex-start;
    --v-btn-box-shadow: none;

    --v-divider-vertical-width: 100%;
    --v-divider-vertical-height: 1px;

    display: flex;
    flex-direction: column;
    gap: 2px;
    background: var(--themeNeutralLightBackground);
    border: 1px solid transparent;
    box-shadow: var(--v-shadow-neutral-8);
    border-radius: 4px;
    padding: var(--size4);
    z-index: 300000;
  }

  .dropdown-enter-active,
  .dropdown-leave-active {
    transition-property: opacity;
    transition-timing-function: var(--v-curve-easy-ease);
    transition-duration: var(--v-duration-ultra-fast);
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
  }
</style>
