import { h } from 'vue';
import { SortStrategyNumber } from '../../Sort/Strategy/Number';
import { make, type FactoryOptions } from '../Factory';
import HubFormSelect from '../../../../Form/Select/HubFormSelect.vue';
import type { MetaDictionary, MetaEntry } from '@plenny/connect';
import { EmptyConstraint } from '../../Filter/Constraints/EmptyConstraint';
import { DictionaryConstraint } from '../../Filter/Constraints/DictionaryConstraint';

export type MetaOptions<T extends MetaEntry = never> = FactoryOptions & {
  dictionary: MetaDictionary<T>;
}

export function MetaFactory<T extends MetaEntry = never>({ dictionary, ...options }: MetaOptions<T>) {
  return make(options, {
    data: {
      label: ({ value }) => {
        return dictionary.label(value);
      },
      spreadsheet: (options) => {
        let accessed = options.column.data.accessor(options);
        let value = options.column.data.transform({ ...options, accessed });
        let t = options.column.data.type();
        let v = options.column.data.label({ ...options, value });

        // https://www.npmjs.com/package/xlsx#cell-object
        return { v, t };
      },
    },
    edit: {
      render: (options) => h(HubFormSelect, {
        options: dictionary.store.value,
        name: options.column.edit.field(options),
        compact: true,
        ...options.column.edit.props,
      }),
    },
    filter: {
      constraints: [
        EmptyConstraint,
        DictionaryConstraint,
      ],
      render: () => h(HubFormSelect, {
        options: dictionary.store.value,
        compact: true,
        multiple: true,
      }),
    },
    sort: {
      strategy: SortStrategyNumber,
    },
  });
}
