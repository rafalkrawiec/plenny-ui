import { utils, writeFile, writeFileXLSX } from "xlsx";


export function useExport({columns, visible, items, exports, header}) {

  function save (){
    const available = columns.value.filter((column) => visible.value[column.key]);
    const headers = [available.map((column) => column.name)];

    const rows = items.value.map((data) => {
      return available.map((column) => column.data.spreadsheet({ column, data }));
    });

    const ws = utils.aoa_to_sheet(header.value ? [...headers, ...rows] : rows);
    const wb = utils.book_new();

    ws['!cols'] = available.map((column) => ({ wpx: column.width }));

    utils.book_append_sheet(wb, ws, 'Dane');

    if (exports.value == "XLSX") {
      writeFileXLSX(wb, 'SheetJSVueAoO.xlsx');
      return;
    }
    if (exports.value == "XLS") {

      writeFile(wb, 'SheetJSVueAoO.xls', { bookType: 'biff8' });
      return;
    }

    writeFile(wb, 'SheetJSVueAoO.csv');

  }

  return {save};
  }
