import { h } from 'vue';
import { SortStrategyText } from '../../Sort/Strategy/Text';
import { make, type FactoryOptions } from '../Factory';
import HubDataDate from '../../../../Data/HubDataDate.vue';
import HubFormInputVue from '../../../../Form/Input/HubFormInput.vue';

export type DateTimeOptions = FactoryOptions & {
  format?: string;
}

export function DateTimeFactory({ format = 'FN', ...options }: DateTimeOptions) {
  return make(options, {
    width: 160,
    data: {
      type: () => {
        return 'd';
      },
      format: ({ value }) => {
        return h(HubDataDate, { value, format });
      },
    },
    edit: {
      render: (options) => h(HubFormInputVue, {
        type: 'date',
        name: options.column.edit.field(options),
        compact: true,
      }),
    },
    sort: {
      strategy: SortStrategyText,
    },
  });
}
