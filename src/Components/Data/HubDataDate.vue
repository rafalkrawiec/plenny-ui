<script setup lang="ts">
  import { computed, type PropType } from 'vue';
  import moment from 'moment';
  import 'moment-timezone';
  import 'moment/dist/locale/pl';
  import 'moment/dist/locale/en-gb';

  const { value, format } = defineProps({
    value: { type: String as PropType<string | null>, required: false },
    format: { type: String as PropType<string>, required: false, default: 'L LT' },
  });

  const formatted = computed(() => {
    if (!value) {
      return null;
    }

    const date = moment.tz(value, __app_timezone).locale(__i18n_fallback).local();

    if (format === 'FN') {
      return date.fromNow();
    }

    return date.format(format);
  });

  const full = computed(() => {
    if (value) {
      return moment.tz(value, __app_timezone).locale(__i18n_fallback).local().format('LLLL');
    }
  });
</script>
<template>
  <data :value="value" :title="full">
    {{ formatted }}
  </data>
</template>
