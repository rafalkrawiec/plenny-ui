import { make, type FactoryOptions } from '../Factory';
import { type MetaDictionary } from '@plenny/connect';
import { h } from 'vue';
import HubFormSelect from '../../../../Form/Select/HubFormSelect.vue';
import { EmptyConstraint } from '../../Filter/Constraints/EmptyConstraint';
import { CollectionConstraint } from '../../Filter/Constraints/CollectionConstraint';

export type CollectionOptions = FactoryOptions & {
  dictionary: MetaDictionary;
}

export function CollectionFactory({ dictionary, ...options }: CollectionOptions) {
  return make(options, {
    data: {
      transform: ({ accessed }) => {
        return accessed.map((item: any) => dictionary.label(item)).join(', ');
      },
    },
    filter: {
      constraints: [
        EmptyConstraint,
        CollectionConstraint,
      ],
      render: () => h(HubFormSelect, {
        options: dictionary.store,
        compact: true,
        multiple: true,
      }),
    },
  });
}
