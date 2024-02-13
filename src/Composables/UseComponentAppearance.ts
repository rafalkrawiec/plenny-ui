import { objectPick } from '@vueuse/core';
import type { ExtractPropTypes, ComputedRef } from 'vue';
import { computed } from 'vue';

export enum Appearance {
  primary = 'primary',
  transparent = 'transparent',
  danger = 'danger',
  success = 'success',
  severe = 'severe',
  warning = 'warning',
  info = 'info',
}

export const AppearanceProps = {
  primary: { type: Boolean, required: false, default: false },
  transparent: { type: Boolean, required: false, default: false },
  danger: { type: Boolean, required: false, default: false },
  success: { type: Boolean, required: false, default: false },
  severe: { type: Boolean, required: false, default: false },
  warning: { type: Boolean, required: false, default: false },
  info: { type: Boolean, required: false, default: false },
};


export type AppearanceProps = ExtractPropTypes<typeof AppearanceProps>;
export type AppearanceOptions = AppearanceProps & Record<string, any>;
export type AppearanceResult = { appearance: ComputedRef<AppearanceOptions> };

export function useComponentAppearance(options: AppearanceOptions): AppearanceResult {
  const appearance = computed(() => objectPick(options, ['primary', 'transparent', 'danger', 'success', 'severe', 'warning', 'info'], true));

  return { appearance };
}
