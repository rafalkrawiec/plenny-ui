import { h } from 'vue';
import { make, type FactoryOptions } from '../Factory';
import { Rule } from '../../Filter/Constraints/Constraint';

export function CodeFactory({ filter, ...options }: FactoryOptions) {
  return make(options, {
    data: {
      format: ({ value, label }) => {
        return h('data', { class: 'code', value }, label);
      },
    },
    filter: {
      rules: [
        Rule.EMPTY,
        Rule.NOT_EMPTY,
        Rule.EQUAL,
        Rule.NOT_EQUAL,
        Rule.STARTS_WITH,
        Rule.ENDS_WITH,
        Rule.CONTAINS
      ],
    },
  });
}
