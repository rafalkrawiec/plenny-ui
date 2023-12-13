import { ref } from 'vue';

type DraggableOptions<T extends Draggable = any> = {
  update: (data: { dragged: T, target: T, position: 'before' | 'after' }) => void;
  mode?: 'vertical' | 'horizontal';
}

type Draggable = {
  id: number;
}

export function useCardsDraggable<T extends Draggable = any>({ update, mode = 'horizontal' }: DraggableOptions<T>) {
  const originalPosition = ref();
  const element = ref();
  const hasBeenDropped = ref(false);

  const dragged = ref<T>();
  const target = ref<T>();
  const position = ref<'before' | 'after'>();

  function onDragStart(event: DragEvent, item: T) {
    if (!event.target) {
      return;
    }

    let target = event.target as HTMLDivElement;

    originalPosition.value = [...target.parentNode!.children].indexOf(target) + 1;
    element.value = target;
    element.value.classList.add('dragging');
    dragged.value = item;
  }

  function onDragOver(event: DragEvent, item: T) {
    event.preventDefault();

    if (!event.target || !dragged.value) {
      return;
    }

    let eventTarget = event.target as HTMLDivElement;
    let card = eventTarget.closest('.card') as HTMLDivElement;

    if (dragged.value.id === item.id) {
      return;
    }

    target.value = item;

    let rect = eventTarget.getBoundingClientRect();
    let middle = mode === 'horizontal'
      ? rect.x + (rect.width / 2)
      : rect.y + (rect.height / 2);

    if ((mode === 'horizontal' ? event.clientX > middle : event.clientY > middle)) {
      position.value = 'after';
      card.after(element.value);
    } else {
      position.value = 'before';
      card.before(element.value);
    }
  }

  function onDrop(event: DragEvent) {
    if (!element.value || !dragged.value || !target.value || !position.value) {
      return;
    }

    update({
      dragged: dragged.value,
      target: target.value,
      position: position.value,
    });

    hasBeenDropped.value = true;
  }

  function onDragEnd(event: DragEvent) {
    if (!element.value) {
      return;
    }

    element.value.classList.remove('dragging');

    if (!hasBeenDropped.value) {
      let parent = element.value.parentNode as HTMLDivElement;
      let child = parent.children[originalPosition.value];

      if (child) {
        parent.insertBefore(element.value, child);
      } else {
        parent.append(element.value);
      }
    }

    hasBeenDropped.value = false;
    element.value = undefined;
    target.value = undefined;
    position.value = undefined;
  }

  return {
    onDrop,
    onDragStart,
    onDragOver,
    onDragEnd,
  };
}
