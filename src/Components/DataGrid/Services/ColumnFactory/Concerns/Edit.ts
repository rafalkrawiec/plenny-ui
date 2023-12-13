import { h, type VNode } from 'vue';
import type { FactoryOptions } from '../Factory';
import HubFormInput from '../../../../Form/Input/HubFormInput.vue';

export type FactoryWithEdit = FactoryOptions & WithEdit;
export type FactoryEditOptions = { edit?: Partial<Internal> };

export type FieldOptions = { column: FactoryWithEdit, data: Record<string, any>, index: number };
export type FieldExtractor = (options: FieldOptions) => string;
export type FieldRenderer = (options: FieldOptions) => VNode;

export type WithEdit = {
  edit: {
    enabled: boolean;
    props: Record<string, any>;
    field: FieldExtractor;
    render: FieldRenderer;
  }
}

type Internal = WithEdit['edit'];
type Defaults = Partial<FactoryEditOptions>;

const DEFAULTS: Internal = {
  enabled: false,
  props: {},

  field: ({ column, index }) => {
    return index + '.' + column.key;
  },

  render: (options) => h(HubFormInput, {
    type: 'text',
    name: options.column.edit.field(options),
    compact: true,
  }),
};

export function edit(options: FactoryOptions, defaults: Defaults = {}) {
  let edit = { ...DEFAULTS };

  if (defaults.edit?.enabled != null) edit.enabled = defaults.edit.enabled;
  if (defaults.edit?.props != null) edit.props = defaults.edit.props;
  if (defaults.edit?.field != null) edit.field = defaults.edit.field;
  if (defaults.edit?.render != null) edit.render = defaults.edit.render;

  if (options.edit?.enabled != null) edit.enabled = options.edit.enabled;
  if (options.edit?.props != null) edit.props = options.edit.props;
  if (options.edit?.field != null) edit.field = options.edit?.field;
  if (options.edit?.render != null) edit.render = options.edit?.render;

  return { edit };
}
