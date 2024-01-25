import { h } from 'vue';
import { make, type FactoryOptions } from '../Factory';
import { SortStrategyNumber } from '../../Sort/Strategy/Number';
import { NumberConstraint } from '../../Filter/Constraints/NumberConstraint';
import HubFormInput from '../../../../Form/Input/HubFormInput.vue';

// Destructure edit prop so it is not passed further.
// We do not want to allow PrimaryKey column edit.
export function PrimaryKeyFactory({ filter, sort, edit, ...options }: FactoryOptions) {
  return make(options, {
    width: 80,
    data: {
      type: () => {
        return 'n';
      },
    },
    header: {
      render: () => h('span', { class: 'icon key-regular' }),
    },
    sort: {
      strategy: SortStrategyNumber,
    },
    edit: {
      enabled: false,
    },
    filter: {
      constraints: [
        NumberConstraint,
      ],
      render: () => h(HubFormInput, {
        compact: true,
        type: 'number',
      }),
    },
  });
}
