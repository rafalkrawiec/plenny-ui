<script setup lang="ts">
  import type { PropType } from 'vue';
  import { computed } from 'vue';

  const props = defineProps({
    loading: { type: Boolean as PropType<boolean>, required: false, default: false },
    error: { type: Object as PropType<Error>, required: false, default: null },
    meta: { type: Object as PropType<any>, required: false, default: null },
    preview: { type: Boolean, required: false, default: false },
  });

  const loading = computed(() => {
    return props.loading || (props.meta && props.meta.loading.value);
  });

  const error = computed(() => {
    return props.error || (props.meta && props.meta.error.value);
  });
</script>
<template>
  <template v-if="error">
    <slot name="whenError">
      <HubAlert danger>
        {{ $t('Wystąpił błąd podczas przetwarzania danych!') }}
      </HubAlert>
    </slot>
  </template>
  <template v-else-if="loading">
    <slot name="whenLoading">
      <HubLoader v-bind="{ preview }" />
    </slot>
  </template>
  <template v-else>
    <slot />
  </template>
</template>
