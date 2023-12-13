<script setup lang="ts">
  import { ref } from 'vue';
  import { useControlErrors } from '../../../Composables/UseControlErrors';
  import { Control } from '../../../Composables/UseControl';

  defineOptions({
    inheritAttrs: false,
  });

  defineSlots<{
    above(props: {}): any,
    controlElement(props: {}): any,
    before(props: {}): any,
    control(props: {}): any,
    after(props: {}): any,
    below(props: {}): any,
  }>();

  const props = defineProps({
    ...Control,
  });

  const htmlControl = ref(null);

  const { hasErrors } = useControlErrors(props);

  defineExpose({
    htmlControl,
  });
</script>
<template>
  <div class="control-wrapper" :class="{ disabled, readonly, 'has-errors': hasErrors, required }">
    <slot name="label">
      <component v-if="label" :is="(id || name) ? 'label' : 'span'" class="label" :for="id || name" v-html="label"/>
    </slot>
    <div class="above" v-if="$slots.above">
      <slot name="above"/>
    </div>
    <slot name="controlElement">
      <div ref="htmlControl" class="control" v-bind="$attrs">
        <slot name="before">
          <span v-if="before" class="icon" :class="before"/>
        </slot>
        <slot name="control">
          <!-- Your control component will go here -->
        </slot>
        <slot name="after">
          <span v-if="after" class="icon" :class="after"/>
        </slot>
        <HubFormValidationPopover :name="name"/>
      </div>
    </slot>
    <div class="below" v-if="$slots.below">
      <slot name="below"/>
    </div>
    <HubFormValidation v-if="!compact" :name="name"/>
  </div>
</template>
