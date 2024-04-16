import { ref, onMounted, nextTick, watchEffect, toValue, type Ref } from 'vue';
import { useResizeObserver } from '@vueuse/core';

type Node = { key: number, node: any };

export function useComponentExpander(group: Ref<HTMLElement | undefined>, children: Ref<Node[]>) {
  const visible = ref<Node[]>([]);
  const hidden = ref<Node[]>([]);

  async function reorganizeChildren() {
    const unwrapped = toValue(children);

    if (!Array.isArray(unwrapped)) {
      visible.value = [];
      hidden.value = [];

      return;
    }

    visible.value = unwrapped.map((node, key) => ({ key, node }));
    hidden.value = [];

    await nextTick(async () => {
      while (visible.value.length > 0 && isOverflowing()) {
        hidden.value.unshift(visible.value.pop() as Node);
        await nextTick();
      }
    });
  }

  function isOverflowing() {
    if (group.value) {
      return group.value.clientWidth < group.value.scrollWidth;
    }

    return false;
  }

  useResizeObserver(document.body, async () => {
    await reorganizeChildren();
  });

  onMounted(async () => {
    await reorganizeChildren();
  });

  watchEffect(async () => {
    await reorganizeChildren();
  });

  return { visible, hidden };
}
