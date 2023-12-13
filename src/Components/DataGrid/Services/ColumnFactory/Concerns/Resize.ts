import type { FactoryOptions } from "../Factory";

export type FactoryWithResize = FactoryOptions & WithResize;
export type FactoryResizeOptions = { resize?: Partial<Internal> };

export type WithResize = {
    resize: {
        enabled: boolean;
    }
}

type Internal = WithResize['resize'];
type Defaults = Partial<FactoryResizeOptions>;

const DEFAULTS = {
    enabled: true,
}

export function resize(options: FactoryOptions, defaults: Defaults = {}): WithResize {
    let resize = { ...DEFAULTS };

    if (defaults.resize?.enabled != null) resize.enabled = defaults.resize.enabled;

    if (options.resize?.enabled != null) resize.enabled = options.resize.enabled;

    return { resize };
}
