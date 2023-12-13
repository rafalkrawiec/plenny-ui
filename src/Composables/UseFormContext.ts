import { inject } from 'vue';
import { FormContextKey } from '../DependencyInjection/Ui';

export function useFormContext() {
  const context = inject(FormContextKey);

  if (!context) {
    throw new Error('Cannot read form context! Make sure you run this hook within a HubForm component.');
  }

  return context;
}
