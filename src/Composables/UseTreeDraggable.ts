import type { NestedSetItem } from '@plenny/support';

type DraggableOptions<T extends NestedSetItem = any> = {
  update: (data: { dragged: T, target: T, position: 'before' | 'inside' | 'after' }) => void;
}

export type DragHandlers<T extends NestedSetItem = any> = ReturnType<typeof useTreeDraggable<T>>;

let originalParentElement: HTMLDivElement | undefined;
let originalPosition: number | undefined;

let draggedTreeElement: HTMLDivElement | undefined;
let draggedTreeChildren: HTMLDivElement | undefined;
let draggedCardElement: HTMLDivElement | undefined;

let hasBeenDropped: boolean | undefined;

let dragged: NestedSetItem | undefined;
let target: NestedSetItem | undefined;
let position: 'before' | 'inside' | 'after' | undefined;

let moveInsideCardElement: HTMLDivElement | undefined = undefined;
let moveInsideTimeout: number | undefined = undefined;

export function useTreeDraggable<T extends NestedSetItem = any>(options: DraggableOptions<T>) {
  function onDragStart(event: DragEvent, item: T) {
    if (!event.target || !item) {
      return;
    }

    event.dataTransfer!.effectAllowed = 'move';

    draggedCardElement = event.target as HTMLDivElement;
    draggedTreeElement = draggedCardElement.closest('.tree-view-item') as HTMLDivElement;
    draggedTreeChildren = draggedTreeElement.querySelector('.children') as HTMLDivElement;

    originalParentElement = draggedTreeElement.parentNode as HTMLDivElement;
    originalPosition = [...originalParentElement.children].indexOf(draggedTreeElement) + 1;

    draggedCardElement.classList.add('dragging');

    if (draggedTreeChildren) {
      draggedTreeChildren.style.display = 'none';
    }

    dragged = item;
  }

  function onDragOver(event: DragEvent, item: T) {
    event.preventDefault();

    if (cannotHandleEvent(event, item)) {
      return;
    }

    if (position === 'inside') {
      return;
    }

    let targetCardElement = event.target as HTMLDivElement;
    let targetTreeElement = targetCardElement.closest('.tree-view-item') as HTMLDivElement;

    target = item;

    let rect = targetCardElement.getBoundingClientRect();
    let middle = rect.y + (rect.height / 2);

    if (event.clientY > middle) {
      position = 'after';
      targetTreeElement.after(draggedTreeElement!);
    } else {
      position = 'before';
      targetTreeElement.before(draggedTreeElement!);
    }
  }

  function onDragEnter(event: DragEvent, item: T) {
    if (cannotHandleEvent(event, item)) {
      return;
    }

    target = item;

    resetMoveInsideTimeout();
    resetMoveInsideCardElement();

    moveInsideCardElement = event.target as HTMLDivElement;
    moveInsideTimeout = initializeMoveInsideCardElement();
  }

  function onDragLeave(event: DragEvent, item: T) {
    if (cannotHandleEvent(event, item)) {
      return;
    }

    resetMoveInsideTimeout();
    resetMoveInsideCardElement();
  }

  function onDrop(event: DragEvent) {
    event.preventDefault();

    if (!draggedTreeElement || !dragged || !target || !position) {
      return;
    }

    resetMoveInsideTimeout();
    resetMoveInsideCardElement();

    options.update({
      dragged: dragged as T,
      target: target as T,
      position: position,
    });

    hasBeenDropped = true;
  }

  function onDragEnd(event: DragEvent) {
    if (!draggedTreeElement || !draggedCardElement) {
      return;
    }

    draggedCardElement.classList.remove('dragging');

    if (!hasBeenDropped) {
      let parent = originalParentElement as HTMLDivElement;
      let child = parent.children[originalPosition!];

      if (child) {
        parent.insertBefore(draggedTreeElement, child);
      } else {
        parent.append(draggedTreeElement);
      }
    }

    if (draggedTreeChildren) {
      draggedTreeChildren.style.display = 'flex';
    }

    originalParentElement = undefined;
    originalPosition = undefined;
    draggedTreeElement = undefined;
    draggedTreeChildren = undefined;
    draggedCardElement = undefined;
    hasBeenDropped = undefined;
    dragged = undefined;
    target = undefined;
    position = undefined;
  }

  return {
    onDrop,
    onDragStart,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDragEnd,
  };
}

function cannotHandleEvent(event: DragEvent, item: NestedSetItem) {
  let current = event.currentTarget as HTMLElement;
  let related = event.relatedTarget as HTMLElement;

  if (current.contains(related)) {
    return true;
  }

  if (!item || !dragged) {
    return true;
  }

  if (item.id === dragged.id) {
    return true;
  }

  return (
    dragged._lft < item._lft &&
    dragged._rgt > item._rgt
  );
}

function resetMoveInsideTimeout() {
  if (moveInsideTimeout) {
    clearTimeout(moveInsideTimeout);
    moveInsideTimeout = undefined;
  }
}

function resetMoveInsideCardElement() {
  if (moveInsideCardElement) {
    moveInsideCardElement.classList.remove('drop-inside');
    moveInsideCardElement = undefined;
  }
}

function initializeMoveInsideCardElement() {
  return setTimeout(() => {
    if (moveInsideCardElement) {
      moveInsideCardElement.classList.add('drop-inside');
      position = 'inside';
    }
  }, 1000);
}
