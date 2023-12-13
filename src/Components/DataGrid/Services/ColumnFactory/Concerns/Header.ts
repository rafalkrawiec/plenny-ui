import { h, type VNode } from "vue";
import type { Column, FactoryOptions } from "../Factory";

export type FactoryWithHeader = FactoryOptions & WithHeader;
export type FactoryHeaderOptions = { header?: Partial<Internal> };

export type HeaderRenderOptions = { column: Column };
export type HeaderRenderer = (options: HeaderRenderOptions) => VNode;

export type WithHeader = {
    header: {
        render: HeaderRenderer;
    };
}

type Internal = WithHeader['header'];
type Defaults = Partial<FactoryHeaderOptions>;

const DEFAULTS: Internal = {
    render: ({ column }) => {
        return h('span', {}, column.name);
    },
}

export function header(options: FactoryOptions, defaults: Defaults = {}): WithHeader {
    let header = { ...DEFAULTS };

    if (defaults.header?.render != null) header.render = defaults.header.render;

    if (options.header?.render != null) header.render = options.header.render;

    return { header };
}
