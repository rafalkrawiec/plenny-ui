import { ref } from 'vue';
import { useApiClient } from '@plenny/connect';
import type { AxiosResponse } from 'axios';

export interface Batch {
  id: string;
  name: string | null;
  options: any;
  pendingJobs: number;
  processedJobs: number;
  failedJobs: number;
  totalJobs: number;
  progress: number;
  createdAt: string | null;
  cancelledAt: string | null;
  finishedAt: string | null;
}

const batchCallback: Record<string, ((batch: Batch) => void)[]> = {};
const batchQueue = ref<Batch[]>([]);

export function useHubBatchWatcher() {
  const client = useApiClient();

  async function fetchBatch(id: string) {
    return await client.get(`/api/v1/hub/batch/${id}`).then((res) => res.data as Batch);
  }

  function registerBatch(batch: AxiosResponse | string) {
    let id = resolveBatchId(batch);

    if (id instanceof Array) {
      id.forEach((id) => registerBatch(id));
      return;
    }

    fetchBatch(id).then((batch) => {
      if (!batch.finishedAt) {
        startBatchIfNotStarted(batch);
        setTimeout(() => registerBatch(batch.id), 1500);
      } else {
        finishBatch(batch);
      }
    });
  }

  return {
    queue: batchQueue,
    registerBatch,
    registerBatchCallback,
  };
}

function startBatchIfNotStarted(batch: Batch) {
  let index = batchQueue.value.findIndex((queued) => queued.id === batch.id);

  if (index < 0) {
    batchQueue.value.push(batch);
    batchQueue.value = [...batchQueue.value];
  } else {
    batchQueue.value[index] = batch;
    batchQueue.value = [...batchQueue.value];
  }
}

function finishBatch(batch: Batch) {
  let index = batchQueue.value.findIndex((b) => b.id === batch.id);

  runBatchCallback(batch);

  if (index >= 0) {
    batchQueue.value[index] = batch;
    batchQueue.value = [...batchQueue.value];

    setTimeout(() => {
      batchQueue.value.splice(index, 1);
      batchQueue.value = [...batchQueue.value];
    }, 1500);
  }
}

function registerBatchCallback(id: AxiosResponse | string, callback: (batch: Batch) => void) {
  let batch = resolveBatchId(id);

  if (batch instanceof Array) {
    batch.forEach((id) => registerBatchCallback(id, callback));
    return;
  }

  if (!batchCallback[batch]) {
    batchCallback[batch] = [];
  }

  batchCallback[batch].push(callback);
}

function runBatchCallback(batch: Batch) {
  if (batchCallback[batch.id]) {
    batchCallback[batch.id].forEach(callback => callback && callback(batch));
    delete batchCallback[batch.id];
  }
}

function resolveBatchId(batch: AxiosResponse | string): string[] | string {
  if (typeof batch === 'object') {
    let header = batch.headers['x-watch-batch'] || [];

    if (header instanceof Array) {
      return header;
    }

    return header.split(',').map(h => h.trim());
  }

  return batch;
}
