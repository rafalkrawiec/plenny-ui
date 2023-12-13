import { objectPick } from '@vueuse/core';
import type { PropType, ExtractPropTypes, ComputedRef } from 'vue';
import { computed } from 'vue';

export enum Size {
  smaller = 'smaller',
  small = 'small',
  regular = 'regular',
  medium = 'medium',
  large = 'large',
  larger = 'larger',
}

export const SizeProps = {
  smaller: { type: Boolean as PropType<boolean>, required: false, default: false },
  small: { type: Boolean as PropType<boolean>, required: false, default: false },
  regular: { type: Boolean as PropType<boolean>, required: false, default: false },
  medium: { type: Boolean as PropType<boolean>, required: false, default: false },
  large: { type: Boolean as PropType<boolean>, required: false, default: false },
  larger: { type: Boolean as PropType<boolean>, required: false, default: false },
};

export type SizeProps = ExtractPropTypes<typeof SizeProps>;
export type SizeOptions = SizeProps & Record<string, any>;
export type SizeResult = { size: ComputedRef<SizeOptions> };

export function useComponentSize(options: SizeOptions): SizeResult {
  const size = computed(() => objectPick(options, ['smaller', 'small', 'regular', 'medium', 'large', 'larger'], true));

  return { size };
}
