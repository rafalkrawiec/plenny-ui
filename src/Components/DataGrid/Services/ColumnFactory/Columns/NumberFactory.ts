import { h } from 'vue';
import { SortStrategyNumber } from '../../Sort/Strategy/Number';
import { make, type FactoryOptions } from '../Factory';
import HubFormInputVue from '../../../../Form/Input/HubFormInput.vue';

export type NumberOptions = FactoryOptions & {
  decimals?: number;
  style?: string;
}

export function NumberFactory({ decimals = 2, style = 'decimal', ...options }: NumberOptions) {

  const numberFormatOptions = (): Intl.NumberFormatOptions => {
    return {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      style
    };
  };

  return make(options, {
    width: 120,
    data: {
      type: () => {
        return 'n';
      },
      transform: ({ accessed }) => {
        let parsed = Number(accessed);

        if (isNaN(parsed)) {
          return null;
        }

        return parsed;
      },
      label: ({ value }) => {
        let formatter = new Intl.NumberFormat(undefined, numberFormatOptions());
        let rounded = style === 'percent' ? value : value.round(decimals);

        return formatter.format(rounded);
      },
      format: ({ value, label }) => {
        return h('data', { class: 'numeric', value }, label);
      },
    },
    edit: {
      render: (options) => h(HubFormInputVue, {
        type: 'number',
        name: options.column.edit.field(options),
        compact: true,
      }),
    },
    sort: {
      strategy: SortStrategyNumber,
    },
  });
}
