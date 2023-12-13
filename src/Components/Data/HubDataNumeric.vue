<script setup lang="ts">
  import { computed, type PropType } from 'vue';

  const { value, format, decimals, currency } = defineProps({
    value: { type: [String, Number] as PropType<string | number>, required: true },
    format: { type: String as PropType<string>, required: false, default: 'decimal' },
    decimals: { type: Number as PropType<number>, required: false, default: 0 },
    currency: { type: String as PropType<string>, required: false },
  });

  const formatted = computed(() => {
    if (value == null) {
      return null;
    }

    let parsed = Number(value);

    if (parsed == null || isNaN(parsed)) {
      return null;
    }

    if (format !== 'percent') {
      parsed = parsed.round(decimals);
    }

    const formatter = new Intl.NumberFormat(undefined, {
      style: currency ? 'currency' : format,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      currency,
    });

    return formatter.format(parsed);
  });
</script>
<template>
  <data :value="value">
    {{ formatted }}
  </data>
</template>
