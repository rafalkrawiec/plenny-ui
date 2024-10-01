import { nextTick, ref, type Ref } from 'vue';
import type { Column } from '../Services/ColumnFactory/Factory';

type Control = Ref<{
  focus: () => void;
  select: () => void;
  open: () => void;
} | undefined>;

type Cell = Ref<{
  focus: () => void;
} | undefined>;

type Props = {
  readonly column: Column;
  readonly editable: boolean;
}

export function useEditableColumn(control: Control, cell: Cell, { column, editable }: Props) {
  const editing = ref(false);

  function start(event: Event) {
    if (!column.edit.enabled || !editable || editing.value) return;
    if (!doesEventStartEdit(event)) return;

    if ((event as KeyboardEvent).key === ' ') {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    editing.value = true;

    nextTick(() => {
      if (typeof control.value?.focus === 'function') {
        control.value?.focus();
      }

      if (typeof control.value?.select === 'function') {
        control.value?.select();
      }

      if (typeof control.value?.open === 'function') {
        control.value?.open();
      }
    });
  }

  function stop() {
    if (!column.edit.enabled || !editable || !editing.value) return;

    // Wait for next tick. Some components might need to trigger change event
    // which might not be possible since the input would have been hidden
    // already by this.
    nextTick(() => {
      editing.value = false;

      // Then trigger focus back on the grid cell which just have been
      // edited to bring back keyboard navigation possibility.
      nextTick(() => {
        cell.value?.focus();
      });
    });
  }

  return { editing, start, stop };
}

function doesEventStartEdit(event: Event) {
  if (event.type === 'dblclick') {
    return true;
  }

  if (event.type === 'keydown') {
    return isSingleCharacterKeyEvent(event as KeyboardEvent) || isControlKeyEvent(event as KeyboardEvent);
  }

  return false;
}

function isSingleCharacterKeyEvent(event: KeyboardEvent) {
  return event.key.length === 1;
}

function isControlKeyEvent(event: KeyboardEvent) {
  return event.key === 'Backspace' || event.key === 'Delete';
}
