import type { SortConfig } from "../../Types";

export function applyOrder(data: Record<string, any>[], config: SortConfig) {
  if (Object.entries(config).filter(([, entry]) => entry.direction !== 'none').length === 0) {
    return data;
  }
  
  return [...data].sort((a, b) => {
    for (let [, { direction, column }] of Object.entries(config)) {
      let result: number;

      if (direction === 'desc') {
        result = column.sort.strategy(
          column.data.accessor({ column, data: b }),
          column.data.accessor({ column, data: a })
        );
      } else {
        result = column.sort.strategy(
          column.data.accessor({ column, data: a }),
          column.data.accessor({ column, data: b })
        );
      }

      if (result === 0) {
        continue;
      }

      return result;
    }

    return 0;
  });
}
