import { utils, writeFile, writeFileXLSX } from 'xlsx';
import type { Column } from '../Services/ColumnFactory/Factory';
import type { Ref } from 'vue';

type Options = {
  columns: Ref<Column[]>;
  visible: Ref<Record<string, boolean>>;
  items: Ref<any[]>;
  exports: Ref<string>;
  header: Ref<boolean>;
}

export function useExport({ columns, visible, items, exports, header }: Options) {

  function save() {
    const available = columns.value.filter((column) => visible.value[column.key]);
    const headers = [available.map((column) => column.name)];

    const rows = items.value.map((data) => {
      return available.map((column) => column.data.spreadsheet({ column, data }));
    });

    const ws = utils.aoa_to_sheet(header.value ? [...headers, ...rows] : rows);
    const wb = utils.book_new();

    ws['!cols'] = available.map((column) => ({ wpx: column.width }));

    utils.book_append_sheet(wb, ws, 'Dane');

    if (exports.value == 'XLSX') {
      writeFileXLSX(wb, 'SheetJSVueAoO.xlsx');
      return;
    }

    if (exports.value == 'XLS') {
      writeFile(wb, 'SheetJSVueAoO.xls', { bookType: 'biff8' });
      return;
    }

    writeFile(wb, 'SheetJSVueAoO.csv');
  }

  return { save };
}
