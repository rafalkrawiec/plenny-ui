<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed, provide, watch, ref, inject } from 'vue';
  import type { DataGrid } from './Types';
  import { applyOrder } from './Services/Sort/ApplyOrder';
  import { applySearch } from './Services/Search/ApplySearch';
  import { usePaginator } from '../../Composables/UsePaginator';
  import DataGridHeader from './Partials/HubDataGridHeader.vue';
  import HubDataGridColumn from './Partials/HubDataGridColumn.vue';
  import { DataGridKey, FormContextKey } from '../../DependencyInjection/Ui';
  import type { Column } from './Services/ColumnFactory/Factory';
  import { applyFilter, defaultConditionGroup } from './Services/Filter/ApplyFilter';
  import HubDataGridFilter from './Partials/Filter/HubDataGridFilter.vue';
  import { useGridNavigation } from './Composables/UseGridNavigation';
  import { useExport } from './Composables/UseExport';
  import { useApplyConfiguration, fillConfiguration, defaultSizingConfiguration, defaultVisibleConfiguration, defaultSortConfiguration, resetConfiguration } from './Composables/UseApplyConfiguration';
  import HubDataGridConfig from './HubDataGridConfig.vue';
  import { useDataGridConfiguration } from '../../Store/DataGridConfigurationStore';

  const emit = defineEmits<{
    (e: 'update:selected', selected: number[] | number | undefined): void
  }>();

  const form = inject(FormContextKey, null);

  const props = defineProps({
    name: { type: String as PropType<string>, required: true },
    keyBy: { type: String as PropType<string>, required: false, default: 'id' },
    perPage: { type: Number as PropType<number>, required: false, default: 15 },
    columns: { type: Array as PropType<Array<Column>>, required: true },
    meta: { type: Object as PropType<any>, required: false, default: null },
    loading: { type: Boolean as PropType<boolean>, required: false, default: false },
    error: { type: Object as PropType<any>, required: false },
    resource: { type: Array as PropType<Array<Record<string, any>>>, required: false, default: [] },
    editable: { type: Boolean as PropType<boolean>, required: false, default: true },
    autoSubmit: { type: Boolean as PropType<boolean>, required: false, default: true },
    selectable: { type: Boolean as PropType<boolean>, required: false, default: true },
    single: { type: Boolean as PropType<boolean>, required: false, default: false },
    selected: { type: [Array, Number] as PropType<number[] | number>, required: false },
    sortable: { type: Boolean as PropType<boolean>, required: false, default: true },
    exportable: { type: Boolean as PropType<boolean>, required: false, default: true },
    configurable: { type: Boolean as PropType<boolean>, required: false, default: true },
    filterable: { type: Boolean as PropType<boolean>, required: false, default: true },
    visibility: { type: Boolean as PropType<boolean>, required: false, default: true },
    searchable: { type: Boolean as PropType<boolean>, required: false, default: true },
  });


  const showFilter = ref(false);
  const columns = ref(props.columns.filter((col) => !!col));
  const search = ref();
  const exports = ref('CSV');
  const header = ref(true);
  const config = ref();


  const database = useDataGridConfiguration();

  const sizing = ref(defaultSizingConfiguration(columns));
  const visible = ref(defaultVisibleConfiguration(columns));
  const sort = ref(defaultSortConfiguration());
  const filter = ref(defaultConditionGroup());

  const items = computed(() => {
    let table = props.resource;

    if (props.filterable) {
      table = applyFilter(table, filter.value);
    }

    if (props.searchable) {
      table = applySearch(table, search.value);
    }

    if (props.sortable) {
      table = applyOrder(table, sort.value);
    }

    return table;
  });

  const template = computed(() => {
    let available = Object.entries(sizing.value).filter(([col]) => visible.value[col]);

    if (selectable.value) {
      available = [['__select', 44], ...available];
    }

    return available.map(([, width]) => `${width}px`).join(' ') + ' auto';
  });

  const paginator = usePaginator({
    name: props.name,
    items,
    perPage: props.perPage,
  });

  const selected = computed({
    get: () => props.selected || (props.single ? undefined : []),
    set: (value) => emit('update:selected', value || (props.single ? undefined : [])),
  });

  const selectable = computed(() => {
    return props.selectable && props.selected;
  });

  function actionToggleAll() {
    if (!props.single && selected.value instanceof Array) {
      let items = new Set(paginator.elements.value.map(item => item[props.keyBy]));

      if (allSelected.value) {
        selected.value = [...selected.value?.filter(key => !items.has(key))];
        return;
      }

      selected.value = [...new Set([...selected.value, ...items])];
    }
  }


  const allSelected = computed(() => {
    if (props.resource.length <= 0) {
      return false;
    }

    if (selected.value instanceof Array) {
      return paginator.elements.value.every(element => {
        // @ts-expect-error
        return selected.value.includes(element[props.keyBy]);
      });
    }

    return false;
  });

  const someSelected = computed(() => {
    if (selected.value instanceof Array) {
      return paginator.elements.value.some(element => {
        // @ts-expect-error
        return selected.value.includes(element[props.keyBy]);
      });
    }

    return false;
  });

  const htmlSelectAllCheckbox = ref();

  watch([allSelected, someSelected], ([all, some]) => {
    if (htmlSelectAllCheckbox.value) {
      htmlSelectAllCheckbox.value.indeterminate = !all && some;
    }
  });

  watch([visible, filter, sizing, sort, search], () => {
    if (props.configurable) {
      database.update(props.name, visible, filter, sizing, sort, search);
    }
  }, { deep: true });


  watch(config, () => {
    if (props.configurable) {
      if (config.value?.configuration) {
        fillConfiguration({ data: config.value.configuration, columns, visible, filter, sizing, sort, search });
      } else {
        resetConfiguration({ columns, visible, filter, sizing, sort, search });
      }
    }
  });


  function actionSelectAll() {
    if (!props.single && selected.value instanceof Array) {
      if (selected.value.length <= 0) {
        selected.value = [...new Set(items.value.map(item => item[props.keyBy]))];
      } else {
        selected.value = [];
      }
    }
  }

  function resetConfig() {
    resetConfiguration({ columns, visible, filter, sizing, sort, search });
  }


  const { applyConfiguration } = useApplyConfiguration(props.name, { database, columns, visible, filter, sizing, sort, search });

  if (props.configurable) {
    applyConfiguration();
  }

  const { save } = useExport({ columns, visible, items, exports, header });

  const body = ref();
  const grid: DataGrid = { data: props.resource, items, columns, loading: props.loading, error: props.error, sizing, visible, sort, selected };

  const { handleMoveKeyEvent, updatePointer } = useGridNavigation(body, grid);

  function updateRow(item: any) {
    if (form) {
      if (!props.editable || !props.autoSubmit) {
        return;
      }

      let keyBy = props.keyBy;
      let index = form.data.value.findIndex((r: any) => r[keyBy] === item[keyBy]);

      if (index < 0) {
        return;
      }

      // @ts-expect-error
      let resource = form.data.value[index];

      form.submitSingleResource({ resource, index, keyBy });
    }
  }

  provide(DataGridKey, grid);
</script>
<template>
  <div class="hub-data-grid">
    <HubToolbar>
      <slot name="title" />
      <slot name="commands" v-bind="grid" />
      <HubButtonGroup reversed>
        <HubPopover v-if="visibility">
          <template #trigger>
            <HubButton before="column-edit-regular" transparent square>
              {{ $t('Kolumny') }}
            </HubButton>
          </template>
          <div class="stack vertical smaller">
            <template v-for="column in columns" :key="column.key">
              <HubFormCheckbox :label="column.name" v-model="visible[column.key]" />
            </template>
          </div>
        </HubPopover>
        <HubButton v-if="filterable" before="data-funnel-regular" transparent square @click="showFilter = true">
          {{ $t('Filtry') }}
        </HubButton>
        <HubPopover v-if="configurable">
          <template #trigger>
            <HubButton before="settings-regular" transparent square>
              {{ $t('Konfiguracje') }}
            </HubButton>
          </template>
          <HubDataGridConfig :name="name" v-model:current="config" @reset:current="resetConfig" :config="config" v-bind="{ visible, filter, sizing, sort, search }" />
        </HubPopover>
        <HubPopover v-if="exportable">
          <template #trigger>
            <HubButton before="arrow-download-regular" transparent square>
              {{ $t('Eksport') }}
            </HubButton>
          </template>
          <div class="stack vertical">
            <div class="stack vertical smaller">
              <HubFormRadio label="CSV" id="export-csv" value="CSV" v-model="exports" />
              <HubFormRadio label="XLS" id="export-xls" value="XLS" v-model="exports" />
              <HubFormRadio label="XLSX" id="export-xlsx" value="XLSX" v-model="exports" />
            </div>
            <div class="stack vertical smaller">
              <HubFormCheckbox :label="$t('Pomiń eksport nagłówka')" v-model="header" />
            </div>
            <HubButtonGroup>
              <HubButton primary small @click="save">{{ $t('Pobierz') }}</HubButton>
            </HubButtonGroup>
          </div>
        </HubPopover>
        <HubButton v-if="selectable && !single && selected instanceof Array" before="checkbox-checked-regular" transparent square @click="actionSelectAll">
          <template v-if="selected.length <= 0">{{ $t('Zaznacz wszystkie') }}</template>
          <template v-else>{{ $t('Odznacz wszystkie') }}</template>
        </HubButton>
        <div class="search-wrapper" v-if="searchable">
          <HubFormInput before="search-regular" small compact :placeholder="$t('Szukaj...')" v-model="search" />
        </div>
      </HubButtonGroup>
    </HubToolbar>
    <div class="wrapper">
      <div class="grid">
        <div class="header">
          <div class="row">

            <div v-if="selectable" class="cell cell-header cell-selectable">
              <div class="inner">
                <label v-if="!single && selected instanceof Array" class="control-checkbox">
                  <input ref="htmlSelectAllCheckbox" type="checkbox" :checked="allSelected" @click="actionToggleAll" />
                  <span class="indicator">
                    <span class="icon checkmark-filled" />
                    <span class="icon subtract-filled" />
                  </span>
                </label>
              </div>
            </div>

            <template v-for="column in columns" :key="column.key">
              <DataGridHeader v-if="visible[column.key]" v-bind="{ column, sortable }" />
            </template>

            <div class="cell cell-header cell-spacer" />

          </div>
        </div>
        <div ref="body" class="body" @keydown="handleMoveKeyEvent">
          <HubDataLoader v-bind="{ meta, loading, error }">
            <template v-for="(item, y) in paginator.elements.value" :key="item[keyBy]">
              <div class="row">

                <div v-if="selectable" class="cell cell-selectable">
                  <data :value="item[keyBy]">
                    <label :class="single ? 'control-radio' : 'control-checkbox'">
                      <input :type="single ? 'radio' : 'checkbox'" v-model="selected" :value="item[keyBy]" />
                      <span class="indicator">
                        <span class="icon checkmark-filled" />
                        <span class="icon subtract-filled" />
                      </span>
                    </label>
                  </data>
                </div>

                <template v-for="(column, x) in columns" :key="column.key">
                  <HubDataGridColumn v-if="visible[column.key]"
                    v-bind="{ column, data: item, index: paginator.start.value + y, visibility }" :data-x="x" :data-y="y"
                    @change="updateRow(item)" @focus="updatePointer(x, y)" />
                </template>

                <div class="cell cell-spacer" />

              </div>
            </template>
            <template v-if="paginator.elements.value.length <= 0">
              <HubDataPlaceholder />
            </template>
          </HubDataLoader>
        </div>
      </div>
    </div>

    <HubPagination :paginator="paginator" />

    <HubDrawer v-model:open="showFilter">
      <h1>{{ $t('Filtrowanie') }}</h1>
      <HubDataGridFilter :columns="columns" :filter="filter" />
      <HubToolbar sticky bottom>
        <HubButtonGroup>
          <HubButton @click="showFilter = false">
            {{ $t('Zamknij') }}
          </HubButton>
        </HubButtonGroup>
      </HubToolbar>
    </HubDrawer>
  </div>
</template>
<style lang="scss" scoped>
  .wrapper {
    --grid-columns: v-bind(template);

    width: 100%;
    font-family: var(--fontSans);
    font-size: 12px;
    background-color: var(--themeNeutralBackground);
    overflow-x: auto;
    padding: 16px 0;

    .grid {
      .body {
        width: auto !important;

        .row {
          &:hover {
            background-color: var(--themeNeutralBackgroundHover);
          }
        }

        .data-placeholder {
          margin: 16px 0;
        }
      }
    }

    .row {
      display: grid;
      grid-template-columns: var(--grid-columns);

      .cell {
        padding: 8px 12px;
        border-bottom: 1px solid var(--themeNeutralBorder);
        outline: none;
        white-space: nowrap;

        &:focus {
          outline: 2px solid var(--themePrimaryBorder);
          outline-offset: -2px;
        }

        &.editing {
          padding: 0;
          z-index: 100;
        }

        :deep(.control) {
          border: none;
          height: 48px;
          padding: 14px 12px;
          box-shadow: var(--neutralShadow16);
          border-radius: 0;

          &:focus-within {
            outline: 2px solid var(--themePrimaryBorder);
            outline-offset: -2px;
          }
        }

        :deep(img) {
          display: block;
          width: 48px;
          height: 48px;
          object-fit: contain;
          margin: -8px;
        }

        :deep(data) {
          display: block;
          padding: 6px 0;
          line-height: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &.numeric {
            font-family: var(--fontMono);
            text-align: right;
          }

          &.code {
            font-family: var(--fontMono);
          }
        }

        :deep(.popover-trigger) {
          padding: 6px 0;
          vertical-align: middle;
          margin-left: 12px;
        }
      }

      .cell-selectable {
        padding: 7px 12px;

        .control-checkbox {
          input {
            margin-right: 0;
          }
        }
      }
    }
  }

  .search-wrapper {
    max-width: 180px;
  }
</style>
