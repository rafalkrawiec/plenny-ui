import { inject, computed, toValue } from 'vue';
import { FormContextKey } from '../DependencyInjection/Ui';

type ControlErrorsOptions = {
  name?: string;
}

export function useControlErrors(options: ControlErrorsOptions) {
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
