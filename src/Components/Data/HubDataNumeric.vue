<script setup lang="ts">
  import { computed } from 'vue';

  defineSlots<{
    default(props: { formatted: string }): any;
  }>();

  const props = defineProps({
    value: { type: [String, Number], required: false },
    format: { type: String, required: false, default: 'decimal' },
    decimals: { type: Number, required: false, default: 0 },
    currency: { type: String, required: false },
  });

  const formatted = computed(() => {
    if (props.value == undefined) {
      return '';
    }

    let parsed = Number(props.value);

    if (isNaN(parsed)) {
      return '';
    }

    const formatter = new Intl.NumberFormat(undefined, {
      style: props.currency ? 'currency' : props.format,
      minimumFractionDigits: props.decimals,
      maximumFractionDigits: props.decimals,
      currency: props.currency,
    });

    return formatter.format(parsed);
  });
</script>
<template>
  <data :value="value">
    <slot v-bind="{ formatted }">
      {{ formatted }}
    </slot>
  </data>
</template>
