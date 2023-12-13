import type { RouteLocationRaw } from "vue-router";
import type { FactoryOptions } from "../Factory";

export type FactoryBaseOptions = Pick<WithBase, 'key' | 'name'> & Partial<Omit<WithBase, 'key' | 'name'>>;
export type LinkOptions = { data: Record<string, any> };
export type LinkExtractor = (options: LinkOptions) => RouteLocationRaw;
export type HrefExtractor = (options: LinkOptions) => string;

export type WithBase = {
  key: string;
  name: string;
  to?: LinkExtractor;
  href?: HrefExtractor;
  width: number;
  visible: boolean;
}

type Internal = Omit<WithBase, 'key' | 'name'>;
type Defaults = Partial<Internal>;

const DEFAULTS: Internal = {
  width: 200,
  visible: true,
}

export function base(options: FactoryOptions, defaults: Defaults = {}): WithBase {
  let base: WithBase = {
    ...DEFAULTS,
    key: options.key,
    name: options.name,
  };

  if (defaults.to != null) base.to = defaults.to;
  if (defaults.href != null) base.href = defaults.href;
  if (defaults.width != null) base.width = defaults.width;
  if (defaults.visible != null) base.visible = defaults.visible;

  if (options.to != null) base.to = options.to;
  if (options.href != null) base.href = options.href;
  if (options.width != null) base.width = options.width;
  if (options.visible != null) base.visible = options.visible;

  if (base.to == null) {
    delete base.to;
  }
  if (base.href == null) {
    delete base.href;
  }

  return base;
}
