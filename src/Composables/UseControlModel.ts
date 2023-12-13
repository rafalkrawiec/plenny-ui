import { computed, inject, watch } from 'vue';
import { FormContextKey } from '../DependencyInjection/Ui';
import type { ControlProps, ControlEmit } from './UseControl';

type UseControlModelOptions = {
  props: ControlProps,
  emit: ControlEmit,
  transform?: (value: any) => any,
}

export function useControlModel({ props, emit, transform }: UseControlModelOptions) {
  const form = inject(FormContextKey, null);

  const model = computed({

    get() {
      // When form is available and the field has a name, retrieve a value
      // from the form using the form component API.
      if (form && props.name) {
        return form.getValue(props.name, props.defaultValue);
      }

      // Otherwise use a standard Vue's modelValue prop.
      return props.modelValue || props.defaultValue;
    },

    set(value) {
      // When form is available and the field has a name, set a value
      // within the form using the form component API.
      if (form && props.name) {
        form.setValue(props.name, value);
      }

      // Finally follow the standard Vue way with emitting update event.
      emit('update:modelValue', value);
    },

  });

  // When initializing composable, check if model value is defined.
  // Otherwise, set its initial value to default provided.
  watch(() => form?.original, () => {
    if (model.value == null || model.value === props.defaultValue) {
      if (form && props.name) {
        form.setDefault(props.name, props.defaultValue);
      } else {
        model.value = props.defaultValue;
      }
    }

    if (transform) {
      model.value = transform(model.value);

      if (form && props.name) {
        form.setDefault(props.name, model.value);
      }
    }
  }, {
    immediate: true,
    deep: true,
  });

  return { model };
}
