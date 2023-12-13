import { make, type FactoryOptions } from '../Factory';
import { type MetaDictionary } from '@plenny/connect';

export type CollectionOptions = FactoryOptions & {
  dictionary: MetaDictionary;
}

export function CollectionFactory({ dictionary, ...options }: CollectionOptions) {
  return make(options, {
    data: {
      transform: ({ accessed }) => {
        return accessed.map((item) => dictionary.label(item)).join(', ');
      },
    },
  });
}
