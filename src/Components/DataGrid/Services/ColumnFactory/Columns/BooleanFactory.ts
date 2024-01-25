import { h } from 'vue';
import { make, type FactoryOptions } from '../Factory';
import { SortStrategyBoolean } from '../../Sort/Strategy/Boolean';
import HubFormCheckbox from '../../../../Form/Checkbox/HubFormCheckbox.vue';
import { BooleanConstraint } from '../../Filter/Constraints/BooleanConstraint';

export function BooleanFactory(options: FactoryOptions) {

  return make(options, {
    width: 110,
    data: {
      type: () => {
        return 'b';
      },
      label: ({ value }) => {
        if (value) {
          return h('span', { class: 'icon checkmark-circle-regular color-success' });
        } else {
          return h('span', { class: 'icon dismiss-circle-regular color-danger' });
        }
      },
      format: ({ value, label }) => {
        return h('data', { class: 'boolean', value }, label);
      },
    },
    edit: {
      render: (options) => h(HubFormCheckbox, {
        name: options.column.edit.field(options),
        compact: true,
      }),
    },
    sort: {
      strategy: SortStrategyBoolean,
    },
    filter: {
      constraints: [
        BooleanConstraint,
      ],
    },
  });
}
