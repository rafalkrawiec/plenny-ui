<script setup lang="ts">
  import { computed } from 'vue';
  import moment from 'moment';
  import 'moment-timezone';
  import 'moment/dist/locale/pl';
  import 'moment/dist/locale/en-gb';

  defineSlots<{
    default(props: { formatted: string }): any;
  }>();

  const props = defineProps({
    value: { type: String, required: false },
    format: { type: String, required: false, default: 'L LT' },
  });

  const formatted = computed(() => {
    if (!props.value) {
      return '';
    }

    const date = moment.tz(props.value, __app_timezone).locale(__i18n_fallback).local();

    if (props.format === 'FN') {
      return date.fromNow();
    }

    return date.format(props.format);
  });

  const full = computed(() => {
    if (props.value) {
      return moment.tz(props.value, __app_timezone).locale(__i18n_fallback).local().format('LLLL');
    }
  });
</script>
<template>
  <data :value="String(value)" :title="full">
    <slot v-bind="{ formatted }">
      {{ formatted }}
    </slot>
  </data>
</template>
