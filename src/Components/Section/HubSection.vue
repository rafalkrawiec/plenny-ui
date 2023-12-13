<script setup lang="ts">
  import { ref, type PropType } from 'vue';

  const props = defineProps({
    title: { type: String as PropType<string>, required: true },
    collapsed: { type: Boolean as PropType<boolean>, required: false, default: false },
  });

  const open = ref(!props.collapsed);
  const visible = ref(!props.collapsed);

  function toggle() {
    if (open.value) {
      open.value = false;
      setTimeout(() => visible.value = false, 150);
    } else {
      open.value = true;
      setTimeout(() => visible.value = true, 150);
    }
  }
</script>
<template>
  <section class="section" :class="{ visible }">
    <div class="header" @click="toggle">
      <h3>{{ title }}</h3>
      <div class="indicator">
        <span class="icon" :class="open ? 'chevron-up-filled' : 'chevron-down-filled'"/>
      </div>
    </div>
    <div class="content-wrapper" :class="{ open, visible }">
      <div class="content">
        <slot/>
      </div>
    </div>
  </section>
</template>
<style scoped lang="scss">
  .section {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--themeBackdropBorder);
    border-bottom: 1px solid var(--themeBackdropBorder);
    margin-left: -32px;
    margin-right: -32px;
    padding: 15px 32px;
    gap: 0;

    &.visible {
      gap: 16px;
    }

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 32px;
      justify-content: space-between;
      margin-top: 0;
      margin-bottom: 0;

      &:hover {
        color: var(--themeNeutralAltForeground);
        cursor: pointer;

        :deep(h3) {
          color: var(--themeNeutralAltForeground);
        }
      }

      :deep(h3) {
        font-weight: var(--fontWeightBold);
        font-size: 14px;
        line-height: 32px;
        transition-property: color;
        transition-duration: var(--v-duration-fast);
        transition-timing-function: var(--v-curve-easy-ease);
      }

      .indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        line-height: 32px;

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          line-height: 20px;
          font-size: 20px;
          transition-property: color;
          transition-duration: var(--v-duration-fast);
          transition-timing-function: var(--v-curve-easy-ease);
        }
      }
    }

    .content-wrapper {
      display: grid;
      grid-template-columns: minmax(100%, 1fr);
      grid-template-rows: 0fr;
      transition-property: grid-template-rows;
      transition-timing-function: var(--v-curve-easy-ease);
      transition-duration: 150ms;
      transition-delay: 150ms;

      &.open {
        grid-template-rows: 1fr;
        transition-delay: 0ms;

        .content {
          transition-delay: 150ms;
          opacity: 1;
        }
      }

      &.visible {
        .content {
          overflow: visible;
        }
      }

      .content {
        overflow: hidden;
        opacity: 0;
        transition-property: opacity;
        transition-timing-function: var(--v-curve-easy-ease);
        transition-duration: 150ms;
        transition-delay: 0ms;
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
    }
  }

  .section ~ .section {
    margin-top: -32px;
    border-top: 1px solid transparent;
  }

  .section {
    :deep(.toolbar) {
      border-color: transparent !important;
    }
  }
</style>
