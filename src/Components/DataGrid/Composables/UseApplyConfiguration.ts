import { defaultConditionGroup, type ConditionGroup } from '../Services/Filter/ApplyFilter';
import { toValue, type Ref } from 'vue';
import type { Column } from '../Services/ColumnFactory/Factory';
import type { DataGridConfiguration } from '../../../Store/DataGridConfigurationStore';

type StoredData = {
  visible: Record<string, boolean>;
  sizing: Record<string, number>;
  sort: Record<string, 'asc' | 'desc'>;
  search: string;
}

type Configuration = {
  columns: Ref<Column[]>;
  visible: Ref<Record<string, boolean>>;
  filter: Ref<ConditionGroup>;
  sizing: Ref<Record<string, number>>;
  sort: Ref<Record<string, 'asc' | 'desc'>>;
  search: Ref<string>;
}

type Options = {
  database: DataGridConfiguration;
  columns: Ref<Column[]>;
  visible: Ref<Record<string, boolean>>;
  filter: Ref<ConditionGroup>;
  sizing: Ref<Record<string, number>>;
  sort: Ref<Record<string, 'asc' | 'desc'>>;
  search: Ref<string>;
}

export function useApplyConfiguration(name: string, { database, columns, visible, filter, sizing, sort, search }: Options) {

  function applyConfiguration() {
    database.get(name).then((result: any) => {
      if (result) {
        fillConfiguration(JSON.parse(result.data), { columns, visible, filter, sizing, sort, search });
      }
    });
  }

  return { applyConfiguration };
}


export function validation(fromDatabase: any, fromGrid: any) {
  return Object.fromEntries(Object.entries(fromGrid).map(([key, value]) => {
    if (fromDatabase && fromDatabase[key] != null) {
      return [key, fromDatabase[key]];
    } else {
      return [key, value];
    }
  }));
}

export function fillConfiguration(data: StoredData, { columns, visible, filter, sizing, sort, search }: Configuration) {
  visible.value = validation(data.visible, defaultVisibleConfiguration(columns));
  filter.value = defaultConditionGroup();
  sizing.value = validation(data.sizing, defaultSizingConfiguration(columns));
  sort.value = validation(data.sort, defaultSortConfiguration());
  search.value = data.search;
}

export function defaultSizingConfiguration(columns: Ref<Column[]>) {
  return Object.fromEntries(toValue(columns).map((col) => {
    return [col.key, col.width != null ? col.width : 200];
  }));
}

export function defaultVisibleConfiguration(columns: Ref<Column[]>) {
  return Object.fromEntries(toValue(columns).map((col) => {
    return [col.key, col.visible != null ? col.visible : true];
  }));
}

export function defaultSortConfiguration() {
  return {};
}

export function resetConfiguration({ columns, visible, filter, sizing, sort, search }: Configuration) {
  sizing.value = defaultSizingConfiguration(columns);
  visible.value = defaultVisibleConfiguration(columns);
  sort.value = defaultSortConfiguration();
  filter.value = defaultConditionGroup();
  search.value = '';
}

