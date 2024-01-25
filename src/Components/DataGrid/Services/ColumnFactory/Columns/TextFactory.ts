import { make, type FactoryOptions } from '../Factory';

export function TextFactory({ filter, ...options }: FactoryOptions) {
  return make(options, {});
}
