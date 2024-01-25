import { h } from 'vue';
import { make, type FactoryOptions } from '../Factory';

export function CodeFactory({ filter, ...options }: FactoryOptions) {
  return make(options, {
    data: {
      format: ({ value, label }) => {
        return h('data', { class: 'code', value }, label);
      },
    },
  });
}
