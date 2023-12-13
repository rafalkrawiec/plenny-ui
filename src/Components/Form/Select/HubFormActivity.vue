<script setup lang="ts">
  import { trans } from '@plenny/translator';

  const options = [
    { label: trans('Aktywny'), value: true },
    { label: trans('Nieaktywny'), value: false },
  ];
</script>
<template>
  <HubFormSelect
    :label="$t('Status')"
    :options="options"
    :searchable="false"
    :clearable="false"
    :default-value="true"
  />
</template>
