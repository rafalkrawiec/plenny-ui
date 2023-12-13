<script setup lang="ts">
  import { useControlErrors } from '../../../Composables/UseControlErrors';
  import type { PropType } from 'vue';

  const props = defineProps({
    name: { type: String as PropType<string>, required: false, default: null },
    initial: { type: Array as PropType<string[]>, required: false, default: [] },
  });

  const { hasErrors, errors } = useControlErrors(props);
</script>
<template>
  <div class="control-validation" v-if="hasErrors">
    <p class="error" v-for="error in errors">
      {{ error }}
    </p>
  </div>
</template>
<style lang="scss" scoped>
  .control-validation {
    .error {
      color: var(--themeDangerForeground);
      font-size: 12px;
      font-weight: var(--fontWeightSemi);
    }
  }
</style>
