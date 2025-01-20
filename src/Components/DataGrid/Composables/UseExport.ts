import type { Column } from '../Services/ColumnFactory/Factory';
import type { Ref } from 'vue';
import type SheetJS from 'xlsx';

type Options = {
  columns: Ref<Column[]>;
  visible: Ref<Record<string, boolean>>;
  items: Ref<any[]>;
  exports: Ref<string>;
  header: Ref<boolean>;
}

declare global {
  const XLSX: typeof SheetJS;
}

export function useExport({ columns, visible, items, exports, header }: Options) {

  function save() {
    const available = columns.value.filter((column) => visible.value[column.key]);
    const headers = [available.map((column) => column.name)];

    const rows = items.value.map((data) => {
      return available.map((column) => column.data.spreadsheet({ column, data }));
    });

    const ws = XLSX.utils.aoa_to_sheet(header.value ? [...headers, ...rows] : rows);
    const wb = XLSX.utils.book_new();

    ws['!cols'] = available.map((column) => ({ wpx: column.width }));

    XLSX.utils.book_append_sheet(wb, ws, 'Dane');

    if (exports.value == 'XLSX') {
      XLSX.writeFileXLSX(wb, 'SheetJSVueAoO.xlsx');
      return;
    }

    if (exports.value == 'XLS') {
      XLSX.writeFile(wb, 'SheetJSVueAoO.xls', { bookType: 'biff8' });
      return;
    }

    XLSX.writeFile(wb, 'SheetJSVueAoO.csv');
  }

  return { save };
}
