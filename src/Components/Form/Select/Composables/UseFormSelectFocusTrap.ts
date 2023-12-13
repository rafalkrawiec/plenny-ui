import { useFocusTrap } from '@vueuse/integrations/useFocusTrap';

export function useFormSelectFocusTrap(target) {
  return useFocusTrap(target, {

    /**
     * We handle initial focus manually. Options wrapper has a negative
     * tabindex which makes it focusable, but not tabbable. On init, we don't
     * want to focus on any option by default, especially when there are
     * no options at all. So, initially we focus on options container
     * from where a user can either enter options loop with "Tab", or when
     * no options available exit with "Escape" key.
     */
    initialFocus: () => target.value,
    fallbackFocus: () => target.value,

    /**
     * When focus trap is active, any click events outside the trapped zone are
     * prevented. Since we want to be able to close options dropdown when
     * clicked outside, we have to allow outside clicks.
     */
    allowOutsideClick: true,

    /**
     * We handle "Escape" key ourselves, since it's related to open/close
     * behaviour of the component and not only focus. We have some additional
     * steps to run before we deactivate the trap, so we cannot rely on default
     * handler.
     */
    escapeDeactivates: false,

  });
}
