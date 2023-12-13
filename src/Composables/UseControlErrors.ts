import { inject, computed, toValue } from 'vue';
import { FormContextKey } from '../DependencyInjection/Ui';

export function useControlErrors(options) {
  const name = computed(() => toValue(options.name));
  const ctx = inject(FormContextKey, null);

  const errors = computed(() => {
    if (ctx && name.value) {
      return ctx.fieldsErrors.value[name.value] || [];
    }

    return [];
  });

  const touched = computed(() => {
    if (ctx && name.value) {
      return ctx.fieldsTouched.value[name.value] || false;
    }

    return false;
  });

  const hasErrors = computed(() => {
    return errors.value.length > 0 && !touched.value;
  });

  return { hasErrors, errors };
}
