import { h, type VNode } from 'vue';
import type { Column, FactoryOptions } from '../Factory';
import { RouterLink } from 'vue-router';
import get from 'lodash.get';
import type { CellObject } from 'xlsx';

export type FactoryWithData = FactoryOptions & WithData;
export type FactoryDataOptions = { data?: Partial<Internal> };

export type DataOptions = { column: Column, data: Record<string, any> };
export type DataTransformerOptions = { column: Column, data: Record<string, any>, accessed: any };
export type DataLabelOptions = { column: Column, data: Record<string, any>, value: any };
export type DataFormatterOptions = { column: Column, data: Record<string, any>, value: any, label: any };
export type DataAccessor = (options: DataOptions) => any;
export type DataTransformer = (options: DataTransformerOptions) => any;
export type DataLabel = (options: DataLabelOptions) => any;
export type DataFormatter = (options: DataFormatterOptions) => VNode;
export type DataPlaceholder = (options: DataOptions) => VNode;
export type DataRenderer = (options: DataOptions) => VNode;
export type DataSpreadsheetType = () => 'b' | 'd' | 'e' | 'n' | 's' | 'z';
export type DataSpreadsheet = (options: DataOptions) => CellObject;

export type WithData = {
  data: {
    accessor: DataAccessor,
    transform: DataTransformer,
    label: DataLabel,
    format: DataFormatter,
    placeholder: DataPlaceholder,
    render: DataRenderer,
    type: DataSpreadsheetType,
    spreadsheet: DataSpreadsheet,
  }
}

type Internal = WithData['data'];
type Defaults = Partial<FactoryDataOptions>;

const DEFAULTS: Internal = {

  accessor: ({ column, data }) => {
    return get(data, column.key, null);
  },

  transform: ({ accessed }) => {
    return accessed;
  },

  label: ({ value }) => {
    return value;
  },

  format: ({ value, label }) => {
    return h('data', { class: 'text', value }, label);
  },

  placeholder: () => {
    return h('data', { value: '' });
  },

  render: (options) => {
    let accessed = options.column.data.accessor(options);
    let value = options.column.data.transform({ ...options, accessed });

    if (value == null) {
      return options.column.data.placeholder(options);
    }

    let label = options.column.data.label({ ...options, value });

    let children = () => options.column.data.format({ ...options, value, label });

    if (options.column.to) return h(RouterLink, { to: options.column.to({ data: options.data }) }, children);
    if (options.column.href) return h('a', { href: options.column.href({ data: options.data }), target: '_blank' }, children);

    return children();
  },

  type: () => {
    return 's';
  },

  spreadsheet: (options) => {
    let accessed = options.column.data.accessor(options);
    let t = options.column.data.type();
    let v = options.column.data.transform({ ...options, accessed });

    // https://www.npmjs.com/package/xlsx#cell-object
    return { v, t };
  },
};

export function data(options: FactoryOptions, defaults: Defaults = {}): WithData {
  let data = { ...DEFAULTS };

  if (defaults.data?.accessor != null) data.accessor = defaults.data.accessor;
  if (defaults.data?.transform != null) data.transform = defaults.data.transform;
  if (defaults.data?.label != null) data.label = defaults.data.label;
  if (defaults.data?.format != null) data.format = defaults.data.format;
  if (defaults.data?.placeholder != null) data.placeholder = defaults.data.placeholder;
  if (defaults.data?.render != null) data.render = defaults.data.render;
  if (defaults.data?.type != null) data.type = defaults.data.type;
  if (defaults.data?.spreadsheet != null) data.spreadsheet = defaults.data.spreadsheet;

  if (options.data?.accessor != null) data.accessor = options.data.accessor;
  if (options.data?.transform != null) data.transform = options.data.transform;
  if (options.data?.label != null) data.label = options.data.label;
  if (options.data?.format != null) data.format = options.data.format;
  if (options.data?.placeholder != null) data.placeholder = options.data.placeholder;
  if (options.data?.render != null) data.render = options.data.render;
  if (options.data?.type != null) data.type = options.data.type;
  if (options.data?.spreadsheet != null) data.spreadsheet = options.data.spreadsheet;

  return { data };
}
