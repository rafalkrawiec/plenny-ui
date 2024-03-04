import { inject } from 'vue';
import { DialogContextKey } from '../DependencyInjection/Ui';

export function useDialogContext() {
  const context = inject(DialogContextKey);

  if (!context) {
    throw new Error('Cannot read dialog context! Make sure you run this hook within a HubDialog component.');
  }

  return context;
}
