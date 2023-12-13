import { Tooltip } from './Tooltip/Tooltip';

export function registerDirectives(app) {
  app.directive('tooltip', Tooltip);
}

// Not possible yet.
// declare module '@vue/runtime-core' {
//   export interface GlobalDirectives {
//     vTooltip: typeof Tooltip,
//   }
// }
