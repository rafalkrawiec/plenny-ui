import type { FactoryOptions } from '../Factory';
import { h, type VNode } from 'vue';
import { Rule } from '../../Filter/Constraints/Constraint';
import HubFormInput from "../../../../Form/Input/HubFormInput.vue";
import type { Condition } from '../../Filter/ApplyFilter';

export type FactoryWithFilter = FactoryOptions & WithFilter;
export type FactoryFilterOptions = { filter?: Partial<Internal> }
export type FieldRendererOptions = { column: FactoryWithFilter, node: Condition }
export type FieldRenderer = (options: FieldRendererOptions) => VNode;

export type WithFilter = {
  filter: {
    enabled: boolean;
    rules: Rule[];
    render: FieldRenderer;
  }
}

type Internal = WithFilter['filter'];
type Defaults = FactoryFilterOptions;

const DEFAULTS: Internal = {
  enabled: true,
  rules: [],
  render: (options) => h(HubFormInput, {
    type: 'text',
    compact: true,
  }),
};

export function filter(options: FactoryOptions, defaults: Defaults = {}): WithFilter {
  let filter = { ...DEFAULTS };

  if (defaults.filter?.enabled != null) filter.enabled = defaults.filter.enabled;
  if (defaults.filter?.rules != null) filter.rules = defaults.filter.rules;
  if (defaults.filter?.render != null) filter.render = defaults.filter.render;

  if (options.filter?.enabled != null) filter.enabled = options.filter.enabled;
  if (options.filter?.rules != null) filter.rules = options.filter.rules;
  if (options.filter?.render != null) filter.render = options.filter?.render;

  return { filter };
}
