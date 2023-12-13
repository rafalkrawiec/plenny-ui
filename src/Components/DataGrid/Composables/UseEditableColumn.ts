import { nextTick, ref } from 'vue';

export function useEditableColumn(control, cell, { column, data, index }) {
  const editing = ref(false);

  function start(event) {
    if (!column.edit.enabled || editing.value) return;
    if (!doesEventStartEdit(event)) return;

    if (event.key === ' ') {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    editing.value = true;

    nextTick(() => {
      if (typeof control.value.focus === 'function') {
        control.value.focus();
      }

      if (typeof control.value.select === 'function') {
        control.value.select();
      }

      if (typeof control.value.open === 'function') {
        control.value.open();
      }
    });
  }

  function stop() {
    if (!column.edit.enabled || !editing.value) return;

    editing.value = false;

    nextTick(() => {
      cell.value.focus();
    });
  }

  return { editing, start, stop };
}

function doesEventStartEdit(event) {
  if (event.type === 'dblclick') {
    return true;
  }

  if (event.type === 'keydown') {
    return isSingleCharacterKeyEvent(event) || isControlKeyEvent(event);
  }

  return false;
}

function isSingleCharacterKeyEvent(event) {
  return event.key.length === 1;
}

function isControlKeyEvent(event) {
  return event.key === 'Backspace' || event.key === 'Delete';
}
