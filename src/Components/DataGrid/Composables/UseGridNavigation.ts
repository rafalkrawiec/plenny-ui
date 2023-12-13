import { nextTick, type Ref } from 'vue';
import type { DataGrid } from '../Types';

export function useGridNavigation(body: Ref, grid: DataGrid) {
  const pointer = { x: 0, y: 0 };

  function movePointer(horizontal, vertical) {
    // Dispatch blur for currently focused cell.
    // This will prevent cell blur handlers to overwrite position which runs
    // when exiting edit mode, and edited cell is focused back for navigation.
    body.value.querySelector(':focus')?.blur();

    nextTick(() => {
      const maxHorizontal = (Object.keys(grid.visible.value).length - 1);
      const maxVertical = (grid.items.value.length - 1);

      let x = pointer.x + horizontal;
      let y = pointer.y + vertical;

      if (x < 0) x = 0;
      if (x > maxHorizontal) x = maxHorizontal;
      if (y < 0) y = 0;
      if (y > maxVertical) y = maxVertical;

      pointer.x = x;
      pointer.y = y;

      body.value.querySelector(`[data-x="${x}"][data-y="${y}"]`).focus();
    });
  }

  function handleMoveKeyEvent(event) {
    switch (event.code) {
      case 'ArrowLeft':
        event.preventDefault();
        movePointer(-1, 0);
        break;

      case 'ArrowRight':
        event.preventDefault();
        movePointer(1, 0);
        break;

      case 'ArrowUp':
        event.preventDefault();
        movePointer(0, -1);
        break;

      case 'ArrowDown':
      case 'Enter':
        event.preventDefault();
        movePointer(0, 1);
        break;
    }
  }

  function updatePointer(x, y) {
    pointer.x = x;
    pointer.y = y;
  }

  return {
    pointer,
    movePointer,
    handleMoveKeyEvent,
    updatePointer,
  };
}
