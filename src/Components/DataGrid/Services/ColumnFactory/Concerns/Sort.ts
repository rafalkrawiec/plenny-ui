import type { FactoryOptions } from "../Factory";
import { SortStrategyText } from "../../Sort/Strategy/Text";

export type FactoryWithSort = FactoryOptions & WithSort;
export type FactorySortOptions = { sort?: Partial<Internal> }
export type SortStrategy = (a: any, b: any) => number;

export type WithSort = {
    sort: {
        enabled: boolean;
        strategy: SortStrategy;
    }
}

type Internal = WithSort['sort'];
type Defaults = FactorySortOptions;

const DEFAULTS: Internal = {
    enabled: true,
    strategy: SortStrategyText,
}

export function sort(options: FactoryOptions, defaults: Defaults = {}): WithSort {
    let sort = { ...DEFAULTS };

    if (defaults.sort?.enabled != null) sort.enabled = defaults.sort.enabled;
    if (defaults.sort?.strategy != null) sort.strategy = defaults.sort.strategy;

    if (options.sort?.enabled != null) sort.enabled = options.sort.enabled;
    if (options.sort?.strategy != null) sort.strategy = options.sort.strategy;

    return { sort };
}
