import { h } from 'vue';
import { SortStrategyNumber } from '../../Sort/Strategy/Number';
import { make, type FactoryOptions } from '../Factory';
import HubFormInputVue from '../../../../Form/Input/HubFormInput.vue';
import get from 'lodash.get';

export type MoneyOptions = FactoryOptions & {
  currency?: string;
  currencyKey?: string;
  decimals?: number;
  decimalsKey?: string;
}

export function MoneyFactory({ currency, currencyKey, decimals, decimalsKey, ...options }: MoneyOptions) {

  function currencyCode(data: Record<string, any>) {
    if (currencyKey) {
      return get(data, currencyKey, __currency_code);
    }

    return currency || __currency_code;
  }

  function fractionDigits(data: Record<string, any>) {
    if (decimalsKey) {
      return get(data, decimalsKey, __currency_decimals);
    }

    return decimals || __currency_decimals;
  }

  function currencyFormatOptions(code: string, fractions: number): Intl.NumberFormatOptions {
    return {
      style: 'currency',
      currency: code,
      minimumFractionDigits: fractions,
      maximumFractionDigits: fractions,
    };
  }

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
      label: ({ data, value }) => {
        let code = currencyCode(data);
        let fractions = fractionDigits(data);
        let formatter = new Intl.NumberFormat(undefined, currencyFormatOptions(code, fractions));

        return formatter.format(value);
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
