import type { FactoryOptions } from '../Factory';
import { h, type VNode } from 'vue';
import HubFormInput from '../../../../Form/Input/HubFormInput.vue';
import type { Condition, Constraint } from '../../Filter/ApplyFilter';
import { StringConstraint } from '../../Filter/Constraints/StringConstraint';
import { EmptyConstraint } from '../../Filter/Constraints/EmptyConstraint';

export type FactoryWithFilter = FactoryOptions & WithFilter;
export type FactoryFilterOptions = { filter?: Partial<Internal> }
export type FieldRendererOptions = { column: FactoryWithFilter, node: Condition }
export type FieldRenderer = (options: FieldRendererOptions) => VNode;

export type WithFilter = {
  filter: {
    enabled: boolean;
    constraints: Constraint[];
    render: FieldRenderer;
  }
}

type Internal = WithFilter['filter'];
type Defaults = FactoryFilterOptions;

const DEFAULTS: Internal = {
  enabled: true,
  constraints: [
    EmptyConstraint,
    StringConstraint,
  ],
  render: (options) => h(HubFormInput, {
    type: 'text',
    compact: true,
  }),
};

export function filter(options: FactoryOptions, defaults: Defaults = {}): WithFilter {
  let filter = { ...DEFAULTS };

  if (defaults.filter?.enabled != null) filter.enabled = defaults.filter.enabled;
  if (defaults.filter?.constraints != null) filter.constraints = defaults.filter.constraints;
  if (defaults.filter?.render != null) filter.render = defaults.filter.render;

  if (options.filter?.enabled != null) filter.enabled = options.filter.enabled;
  if (options.filter?.constraints != null) filter.constraints = options.filter.constraints;
  if (options.filter?.render != null) filter.render = options.filter?.render;

  return { filter };
}
