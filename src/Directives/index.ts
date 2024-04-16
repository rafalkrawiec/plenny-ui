import { Tooltip } from './Tooltip/Tooltip';
import type { App } from 'vue';

export function registerDirectives(app: App) {
  app.directive('tooltip', Tooltip);
}

// Not possible yet.
// declare module '@vue/runtime-core' {
//   export interface GlobalDirectives {
//     vTooltip: typeof Tooltip,
//   }
// }
