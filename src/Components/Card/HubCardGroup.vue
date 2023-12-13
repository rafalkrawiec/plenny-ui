<script setup lang="ts">
  import { computed, type PropType } from 'vue';

  const props = defineProps({
    selected: { type: [String, Number, Array] as PropType<string | number | string[] | number[]>, required: false, default: null },
  });

  const selectable = computed(() => {
    let selected = props.selected;

    if (selected instanceof Array) {
      return selected.length > 0;
    }

    return selected != null && selected !== '';
  });
</script>
<template>
  <div class="card-group" :class="{ 'select-mode': selectable }">
    <slot />
  </div>
</template>
<style scoped lang="scss">
  .card-group {
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);
    gap: 16px;

    // When user starts selecting items, we want to show all masks
    // and checkboxes. It makes checkboxes more visible, and should
    // provide a "selection mode" feeling.
    &.select-mode {
      :deep(.card.selectable) {
        .card-selector {
          opacity: 1;
        }

        .card-preview:after {
          background-position: 0 0;
        }
      }
    }
  }
</style>
