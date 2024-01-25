import { h } from 'vue';
import { make, type FactoryOptions } from '../Factory';
import HubFormInput from '../../../../Form/Input/HubFormInput.vue';

export function PhoneFactory(options: FactoryOptions) {
  return make(options, {
    width: 120,
    data: {
      format: ({ value, label }) => {
        return h('a', { href: `tel:${value}` }, h('data', { class: 'text', value }, label));
      },
    },
    edit: {
      render: (options) => h(HubFormInput, {
        type: 'tel',
        name: options.column.edit.field(options),
        compact: true,
      }),
    },
  });
}
