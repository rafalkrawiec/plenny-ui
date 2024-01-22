import { ref } from 'vue';

interface Config {
  title?: string;
  description?: string;
  yes?: string;
  no?: string;
}

export interface Confirmation extends Config {
  confirm: () => void;
  cancel: () => void;
}

const current = ref<Confirmation>();

export function useHubConfirmation() {
  return current;
}

export function useConfirm() {
  return async (config?: Config) => new Promise<void>((resolve, reject) => {
    function confirm() {
      current.value = undefined;
      resolve();
    }

    function cancel() {
      current.value = undefined;
      reject();
    }

    current.value = { ...config, confirm, cancel };
  });
}
