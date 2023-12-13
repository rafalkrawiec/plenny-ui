import { h } from "vue";
import { make, type FactoryOptions } from "../Factory";
import { SortStrategyNumber } from "../../Sort/Strategy/Number";
import { Rule } from "../../Filter/Constraints/Constraint";

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
            rules: [
                Rule.EQUAL,
                Rule.NOT_EQUAL,
                Rule.STARTS_WITH,
                Rule.ENDS_WITH,
                Rule.CONTAINS,
                Rule.HIGHER,
                Rule.HIGHER_OR_EQUAL,
                Rule.LOWER,
                Rule.LOWER_OR_EQUAL,
            ],
        },
    });
}
