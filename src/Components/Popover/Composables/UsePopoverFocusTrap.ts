import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';
import type { Ref } from 'vue';

export function usePopoverFocusTrap(target: Ref<HTMLElement>) {
  return useFocusTrap(target, {
    fallbackFocus: () => target.value,

    /**
     * Because it's a dialog we might encounter scroll to top behaviour
     * when trap is activated (for example when closing select list).
     *
     * This option disables that specific case.
     */
    preventScroll: true,

    /**
     *
     */
    immediate: false,

    /**
     * Usually we allow closing floating element when user clicks outside.
     * That's not the case with modals.
     *
     * Since usually modals are used to handle more complicated tasks like
     * forms, tables, image cropping, we want to avoid closing modal when user
     * accidentally clicks outside, meaning loss of work done within modal.
     */
    allowOutsideClick: false,

    /**
     * We do not want to use built in escape functionality. Escape button
     * is handled by ourselves since we also have to run additional actions
     * when "esc" is pressed.
     */
    escapeDeactivates: false,

  });
}
