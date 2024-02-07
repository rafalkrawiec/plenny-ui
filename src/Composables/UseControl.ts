import { objectPick } from '@vueuse/core';
import { toValue, computed, type PropType, type ExtractPropTypes } from 'vue';
import { useControlModel } from './UseControlModel';

export const Control = {
  id: { type: String as PropType<string>, required: false },
  name: { type: String as PropType<string>, required: false },
  disabled: { type: Boolean as PropType<boolean>, required: false, default: false },
  readonly: { type: Boolean as PropType<boolean>, required: false, default: false },
  required: { type: Boolean as PropType<boolean>, required: false, default: false },
  compact: { type: Boolean as PropType<boolean>, required: false, default: false },
  label: { type: String as PropType<string>, required: false },
  before: { type: String as PropType<string>, required: false },
  after: { type: String as PropType<string>, required: false },
  errors: { type: Array as PropType<string[]>, required: false, default: [] },
  value: { type: [String, Number, Array, Boolean] as PropType<any>, required: false },
  modelValue: { type: [String, Number, Array, Boolean] as PropType<any>, required: false },
  defaultValue: { type: [String, Number, Array, Boolean] as PropType<any>, required: false, default: '' },
};

export type ControlProps = ExtractPropTypes<typeof Control>;
export type ControlKeys = Array<keyof ControlProps>;
export type ControlEmit = (event: 'update:modelValue', ...args: any[]) => void;

type UseControlOptions = {
  props: ControlProps,
  emit: ControlEmit,
  except?: ControlKeys,
  transform?: (value: any) => any
}

export function useControl({ props, emit, except = [], transform }: UseControlOptions) {
  const { model } = useControlModel({ props, emit, transform });

  const control = computed(() => objectPick(toValue(props), (Object.keys(Control) as ControlKeys).filter((p) => {
    return !except.includes(p);
  })));

  const input = computed(() => ({
    id: props.id || props.name,
    name: props.name,
    disabled: props.disabled,
    readonly: props.readonly,
    required: props.required,
  }));

  return { control, input, model };
}
