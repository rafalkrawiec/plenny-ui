import { h } from 'vue';
import { SortStrategyNumber } from '../../Sort/Strategy/Number';
import { make, type FactoryOptions } from '../Factory';
import HubFormSelect from '../../../../Form/Select/HubFormSelect.vue';
import { Rule } from '../../Filter/Constraints/Constraint';
import { useHubDictionaryStore } from '@plenny/connect';

export type DictionaryOptions = FactoryOptions & {
  store: string;
}

export function DictionaryFactory({ store, ...options }: DictionaryOptions) {
  const dictionary = useHubDictionaryStore();

  return make(options, {
    data: {
      label: ({ value }) => {
        return dictionary.record(store, value)?.label;
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
        options: dictionary.store(store),
        name: options.column.edit.field(options),
        compact: true,
      }),
    },
    filter: {
      rules: [
        Rule.EMPTY,
        Rule.NOT_EMPTY,
        Rule.EQUAL,
        Rule.NOT_EQUAL,
        Rule.IN,
        Rule.NOT_IN,
      ],

      render: ({ node }) => h(HubFormSelect, {
        options: dictionary.store(store),
        compact: true,
        multiple: node.constraint && [Rule.IN, Rule.NOT_IN].includes(node.constraint),
      }),
    },
    sort: {
      strategy: SortStrategyNumber,
    },
  });
}
