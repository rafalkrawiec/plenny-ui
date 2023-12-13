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

  async function confirm(config?: Config) {
    return new Promise<void>((resolve, reject) => {
      function onConfirm() {
        current.value = undefined;
        resolve();
      }

      function onCancel() {
        current.value = undefined;
        reject();
      }

      current.value = createConfirmation(config, onConfirm, onCancel);
    });
  }

  return { confirmation: current, confirm };
}

function createConfirmation(config: Config | undefined, onConfirm: () => void, onCancel: () => void) {
  return { ...config, confirm: () => onConfirm(), cancel: () => onCancel() };
}
