import { focusable } from 'tabbable';
import { watch, ref } from 'vue';
import { unrefElement, type MaybeComputedElementRef, type MaybeElement } from '@vueuse/core';

export function useFocusNavigation<T extends MaybeElement = MaybeElement>(within: MaybeComputedElementRef<T>) {
  const wrapper = ref();

  watch(() => unrefElement(within), (element) => {
    wrapper.value = element;
  });

  function all() {
    if (wrapper.value) {
      return focusable(wrapper.value, { displayCheck: 'none' });
    }

    return [];
  }

  function getNextFocusable() {
    let list = all();
    let current = list.indexOf(document.activeElement as HTMLElement);
    let last = list.length - 1;

    // When active element is not found within the list, or when it's the last
    // element from list, we want to focus on the first element by default.
    if (current === -1 || current === last) {
      return list[0];
    }

    return list[current + 1];
  }

  function getPrevFocusable() {
    let list = all();
    let current = list.indexOf(document.activeElement as HTMLElement);
    let last = list.length - 1;

    // When active element is not found within the list, or when it's the first
    // element from list, we want to focus on the last element by default.
    if (current === -1 || current === 0) {
      return list[last];
    }

    return list[current - 1];
  }

  function focusNext(options = undefined) {
    focus(getNextFocusable(), options);
  }

  function focusPrev(options = undefined) {
    focus(getPrevFocusable(), options);
  }

  function focus(element, options = undefined) {
    if (element) {
      element.focus(options);
    }
  }

  return {
    focusNext,
    focusPrev,
  };
}
