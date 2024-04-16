<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import { onClickOutside } from '@vueuse/core';
  import { usePopoverFloating } from './Composables/UsePopoverFloating';
  import { usePopoverFocusTrap } from './Composables/UsePopoverFocusTrap';

  defineSlots<{
    trigger(props: {}): any,
    default(props: {}): any,
  }>();

  const htmlTrigger = ref();
  const htmlPopover = ref();
  const htmlArrow = ref();

  const open = ref(false);

  const { floatingStyles, arrowStyles } = usePopoverFloating(htmlTrigger, htmlPopover, htmlArrow);
  const { activate, deactivate } = usePopoverFocusTrap(htmlPopover);

  onClickOutside(htmlPopover, () => {
    hide();
  }, {
    ignore: [
      '.select-list',
      '.dropdown-list',
    ],
  });

  const toggle = () => {
    if (open.value) {
      hide();
    } else {
      show();
    }
  };

  const show = () => {
    open.value = true;

    nextTick(() => {
      activate();
    });
  };

  const hide = () => {
    deactivate();
    open.value = false;
  };
</script>
<template>
  <div class="popover-wrapper">
    <div ref="htmlTrigger" class="popover-trigger" @click.prevent.stop="toggle()">
      <slot name="trigger" />
    </div>
    <Teleport to="body">
      <Transition name="popover">
        <div v-if="open" ref="htmlPopover" class="popover" v-bind:style="floatingStyles" tabindex="-1" @keydown.esc="hide">
          <div ref="htmlArrow" class="arrow" v-bind:style="arrowStyles" />
          <div class="inner-wrapper">
            <slot />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
<style scoped lang="scss">
  .popover-wrapper {
    display: contents;
  }

  .popover-trigger {
    cursor: pointer;
    display: inline-flex;
  }

  .popover {
    position: absolute;
    max-width: 300px;
    border: 1px solid transparent;
    border-radius: 4px;
    background: var(--themeNeutralLightBackground);
    box-shadow: var(--neutralShadow16);
    z-index: 300000;

    .inner-wrapper {
      background: var(--themeNeutralLightBackground);
      border-radius: 4px;
      padding: 8px 16px;
    }

    .arrow {
      position: absolute;
      width: 10px;
      height: 10px;
      background: var(--themeNeutralLightBackground);
      box-shadow: var(--neutralShadow16);
      z-index: -1;
      pointer-events: none;
      transform: rotate(45deg);
    }
  }

  .popover-enter,
  .popover-leave {
    transition-property: opacity;
    transition-timing-function: var(--v-curve-easy-ease);
    transition-duration: var(--v-duration-faster);
  }

  .popover-enter-start,
  .popover-leave-end {
    opacity: 0;
  }

  .popover-enter-end,
  .popover-leave-start {
    opacity: 1;
  }

</style>
