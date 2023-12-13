import type { MaybeRefOrGetter } from 'vue';
import { ref, toValue, watch } from 'vue';

export type DataLoaderOptions = {
  loading: MaybeRefOrGetter<boolean>,
}

export function useHubDataLoader(options: DataLoaderOptions) {
  const loading = ref<boolean>(toValue(options.loading) || true);
  const error = ref<Error>();

  watch(error, (value) => {
    if (value) {
      console.error(value);
    }
  });

  return { loading, error };
}
