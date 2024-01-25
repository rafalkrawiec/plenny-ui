import { h } from 'vue';
import { SortStrategyText } from '../../Sort/Strategy/Text';
import { make, type FactoryOptions } from '../Factory';
import HubDataDate from '../../../../Data/HubDataDate.vue';
import HubFormDate from '../../../../Form/Input/HubFormDate.vue';
import { EmptyConstraint } from '../../Filter/Constraints/EmptyConstraint';
import { DateConstraint } from '../../Filter/Constraints/DateConstraint';

export type DateTimeOptions = FactoryOptions & {
  format?: string;
}

export function DateFactory({ format = 'L', ...options }: DateTimeOptions) {
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
      render: (options) => h(HubFormDate, {
        name: options.column.edit.field(options),
        compact: true,
      }),
    },
    sort: {
      strategy: SortStrategyText,
    },
    filter: {
      constraints: [
        EmptyConstraint,
        DateConstraint,
      ],
      render: () => h(HubFormDate, {
        compact: true,
      }),
    },
  });
}
