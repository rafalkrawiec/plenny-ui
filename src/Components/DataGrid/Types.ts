import type { Ref, WritableComputedRef } from 'vue';
import type { Column } from './Services/ColumnFactory/Factory';

export type SizeConfig = Record<string, number>;
export type VisibilityConfig = Record<string, boolean>;
export type SortConfig = Record<string, { column: Column, direction: 'asc' | 'desc' | 'none' }>;

export type DataGrid = {
  data: Array<Record<string, any>>;
  items: Ref<Array<Record<string, any>>>;
  columns: Ref<Array<Column>>;
  loading: boolean;
  error: Ref<any>;
  sizing: Ref<SizeConfig>;
  visible: Ref<VisibilityConfig>;
  sort: Ref<SortConfig>;
  selected: WritableComputedRef<number[]>;
}
