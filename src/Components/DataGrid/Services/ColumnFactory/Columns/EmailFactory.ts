import { h } from "vue";
import { make, type FactoryOptions } from "../Factory";
import HubFormInput from "../../../../Form/Input/HubFormInput.vue";
import { Rule } from "../../Filter/Constraints/Constraint";

export function EmailFactory({ filter, ...options }: FactoryOptions) {
    return make(options, {
        width: 200,
        data: {
            format: ({ value }) => {
                return h('a', { href: `mailto:${value}` }, h('data', { class: 'text', value }, value));
            }
        },
        edit: {
            render: (options) => h(HubFormInput, {
                type: 'email',
                name: options.column.edit.field(options),
                compact: true,
            }),
        },
        filter: {
            rules: [
                Rule.EMPTY ,
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
