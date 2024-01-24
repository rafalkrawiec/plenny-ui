<script setup lang="ts" generic="T extends Record<string, any>">
  import type { PropType } from 'vue';
  import { ref, inject } from 'vue';
  import { DataGridKey } from '../../../DependencyInjection/Ui';
  import type { Column } from '../Services/ColumnFactory/Factory';

  const props = defineProps({
    column: { type: Object as PropType<Column>, required: true },
    sortable: { type: Boolean as PropType<boolean>, required: true },
    selectable: { type: Boolean as PropType<boolean>, required: false, default: true },
  });

  const grid = inject(DataGridKey);

  const isMoving = ref(false);
  const headerEl = ref();

  function sort() {
    if (!props.column.sort?.enabled || !props.sortable) {
      return;
    }

    let direction = grid!.sort.value[props.column.key]?.direction;

    if (direction === 'asc') {
      grid!.sort.value[props.column.key].direction = 'desc';
    } else if (direction === 'desc') {
      delete grid!.sort.value[props.column.key];
    } else {
      grid!.sort.value[props.column.key] = {
        direction: 'asc',
        column: props.column,
      };
    }
  }

  function onMouseMove(event) {
    event.stopPropagation();
    event.preventDefault();

    return requestAnimationFrame(function () {
      let rect = headerEl.value.getBoundingClientRect();
      let width = event.clientX - rect.x;

      if (width > 100) {
        grid!.sizing.value[props.column.key] = width;
      }
    });
  }

  function onMouseUp(event) {
    event.stopPropagation();
    event.preventDefault();

    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', onMouseUp);

    isMoving.value = false;
    document.body.classList.remove('is-col-resizing');
  }

  function onMouseDown(event) {
    event.stopPropagation();
    event.preventDefault();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    isMoving.value = true;
    document.body.classList.add('is-col-resizing');
  }
</script>
<template>
  <div ref="headerEl" class="cell cell-header" :class="{ isMoving }">
    <div class="inner" @click="sort">
      <div class="name">
        <component :is="column.header.render({ column })" />
      </div>
      <div v-if="sortable && column.sort.enabled && grid!.sort.value[column.key]?.direction" class="controls">
        <span class="icon" :class="grid!.sort.value[column.key]?.direction === 'asc' ? 'text-sort-ascending-regular' : 'text-sort-descending-regular'" />
      </div>
    </div>
    <div v-if="column.resize.enabled" class="resize" @mousedown="onMouseDown" />
  </div>
</template>
<style lang="scss">
  .cell-header {
    display: flex;
    align-items: center;
    user-select: none;
    position: relative;
    font-weight: var(--fontWeightBold);
    border-bottom: 1px solid var(--themeNeutralBorder);
    text-align: left;

    &:hover {
      background: var(--themeNeutralBackgroundHover);
    }

    &.isMoving {
      background: var(--themeNeutralBackgroundHover);

      .resize {
        border-color: var(--themeNeutralBorderHover);
      }
    }

    .inner {
      display: flex;
      align-items: center;
      flex: 1 1;
      gap: 2px;
      min-width: 0;
      cursor: pointer;

      .name {
        display: flex;
        flex: 1 1;
        min-width: 0;
        padding: 6px 0;

        span {
          flex: 1 1 auto;
          min-width: 0;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &.numeric {
            text-align: right;
          }
        }
      }

      .controls {
        flex: 0 0 16px;
        min-width: 0;

        .icon {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 16px;
          height: 32px;
          line-height: 32px;
          font-size: 16px;
        }
      }
    }

    .resize {
      position: absolute;
      right: 0;
      flex: 0 0 4px;
      cursor: col-resize;
      width: 12px;
      height: 100%;
      border-right: 1px solid transparent;
      border-radius: 2px;
      display: inline-block;
      transition-property: border;
      transition-timing-function: var(--v-curve-easy-ease);
      transition-duration: var(--v-duration-ultra-fast);

      &:hover {
        border-color: var(--themeNeutralBorderHover);
      }
    }
  }

  .is-col-resizing {
    cursor: col-resize !important;
  }
</style>
