import { Rule } from "../../Filter/Constraints/Constraint";
import { make, type FactoryOptions } from "../Factory";

export function TextFactory({ filter, ...options }: FactoryOptions) {
    return make(options, {
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
