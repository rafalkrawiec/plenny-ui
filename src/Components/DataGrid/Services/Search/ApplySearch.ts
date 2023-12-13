export function applySearch(data: Record<string, any>[], search: string) {
  if (!search) {
    return data;
  }

  return data.filter((row) => {
    for (let key of Object.keys(row)) {
      if (typeof row[key] === 'number' || typeof row[key] === 'string') {
        if (row[key].toString().toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
          return true;
        }
      }
    }
  });
}
