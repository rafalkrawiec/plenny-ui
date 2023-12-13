import { h } from "vue";
import { SortStrategyNumber } from "../../Sort/Strategy/Number";
import { make, type FactoryOptions } from "../Factory";
import HubFormSelectVue from "../../../../Form/Select/HubFormSelect.vue";

export type ForeignKeyOptions = FactoryOptions & {
    records?: { value: any, label: any }[];
}

export function ForeignKeyFactory({ records = [], ...options }: ForeignKeyOptions) {
    return make(options, {
        data: {
            label: ({ value }) => {
                return records.find((option) => option.value === value)?.label;
            },
            type: () => {
                return 'n';
            },
        },
        edit: {
            render: (options) => h(HubFormSelectVue, {
                options: records,
                searchable: false,
                name: options.column.edit.field(options),
                compact: true,
            }),
        },
        sort: {
            strategy: SortStrategyNumber,
        }
    });
}
