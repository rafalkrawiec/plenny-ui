import { h } from 'vue';
import { SortStrategyText } from '../../Sort/Strategy/Text';
import { make, type FactoryOptions } from '../Factory';
import HubDataDate from '../../../../Data/HubDataDate.vue';
import HubFormDateTime from '../../../../Form/Input/HubFormDateTime.vue';
import { EmptyConstraint } from '../../Filter/Constraints/EmptyConstraint';
import { DateTimeConstraint } from '../../Filter/Constraints/DateTimeConstraint';

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
      render: (options) => h(HubFormDateTime, {
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
        DateTimeConstraint,
      ],
      render: () => h(HubFormDateTime, {
        compact: true,
      }),
    },
  });
}
