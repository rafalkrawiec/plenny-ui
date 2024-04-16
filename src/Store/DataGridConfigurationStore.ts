import { defineStore } from 'pinia';
import { ref, toValue, type Ref } from 'vue';
import type { ConditionGroup } from '../Components/DataGrid/Services/Filter/ApplyFilter';

export type DataGridConfiguration = ReturnType<typeof useDataGridConfiguration>;

export const useDataGridConfiguration = defineStore('hub_data_grid_configuration', () => {
  const connection = ref<IDBDatabase>();

  async function init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('HubDataGrid', 1);

      request.onupgradeneeded = () => {
        request.result.createObjectStore('configurations', { keyPath: 'name' });
      };

      request.onsuccess = () => {
        connection.value = request.result;
        resolve(connection.value);
      };

      request.onerror = (err) => {
        reject(err);
      };
    });
  }

  async function get(name: string) {
    return new Promise((resolve, reject) => {
      const db = connection.value;

      if (!db) {
        throw new Error('IndexedDB not connected!');
      }

      const transaction = db.transaction('configurations', 'readonly');
      const store = transaction.objectStore('configurations');
      const request = store.get(name);

      request.onsuccess = () => resolve(request.result);
      request.onerror = (error) => reject(error);
    });
  }

  async function update(
    name: string,
    visible: Ref<Record<string, boolean>>,
    filter: Ref<ConditionGroup>,
    sizing: Ref<Record<string, number>>,
    sort: Ref<Record<string, 'asc' | 'desc'>>,
    search: Ref<string>,
  ) {
    const db = connection.value;

    if (!db) {
      throw new Error('IndexedDB not connected!');
    }

    const transaction = db.transaction('configurations', 'readwrite');
    const store = transaction.objectStore('configurations');

    store.put({
      name: name,
      data: JSON.stringify({
        visible: toValue(visible),
        filter: toValue(filter),
        sizing: toValue(sizing),
        sort: toValue(sort),
        search: toValue(search),
      }),
    });
  }


  return {
    connection,
    init,
    get,
    update,
  };
});
