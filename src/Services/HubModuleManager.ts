import type { RouteLocationRaw } from 'vue-router';
import { reactive } from 'vue';

export type HubModule = {
  id: string,
  name: string,
  icon: string,
  to: RouteLocationRaw,
}

export const HubModuleManager = {
  registered: reactive<Record<string, HubModule>>({}),

  addModule({ id, ...module }: HubModule) {
    this.registered[id] = { id, ...module };
  },
};
