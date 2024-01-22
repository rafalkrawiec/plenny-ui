import { make, type FactoryOptions } from '../Factory';
import { h } from 'vue';

export type PhotoFactoryOptions = FactoryOptions;

export function PhotoFactory({ sort, resize, filter, ...options }: PhotoFactoryOptions) {
  return make(options, {
    width: 56,
    header: {
      render: () => {
        return h('span', { class: 'icon image-regular' });
      },
    },
    sort: {
      enabled: false,
    },
    resize: {
      enabled: false,
    },
    filter: {
      enabled: false,
    },
    data: {
      format: ({ value }) => {
        return h('img', { src: `/photos/56x56/${value}` });
      },
    },
  });
}
