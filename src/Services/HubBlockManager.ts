import type { Component } from 'vue';

export type BlockContext = Record<string, any>;
export type Block = { context: BlockContext };

export interface GlobalBlockRegistry extends Record<string, Block> {

}

export interface GlobalBlockEntries extends Record<BlockName, Array<Component>> {

}

export interface GlobalBlockOverrides extends Record<BlockName, Array<Component>> {

}

export type BlockName = keyof GlobalBlockRegistry;

const registry = {} as GlobalBlockRegistry;
const entries = {} as GlobalBlockEntries;
const overrides = {} as GlobalBlockOverrides;

export const HubBlockManager = {

  create(name: BlockName, context: BlockContext) {
    if (registry[name]) {
      return;
    }

    registry[name] = { context };
  },

  cleanup(name: BlockName) {
    delete registry[name];
  },

  register(name: BlockName, component: Component | Component[]) {
    if (!entries[name]) {
      entries[name] = [];
    }

    if (component instanceof Array) {
      component.forEach((single) => entries[name].push(single));
      return;
    }

    entries[name].push(component);
  },

  override(name: BlockName, component: Component) {
    if (!overrides[name]) {
      overrides[name] = [];
    }

    overrides[name].push(component);
  },

  resolve(name: BlockName) {
    return {
      ...registry[name],
      children: entries[name],
      override: overrides[name],
    };
  },

};
