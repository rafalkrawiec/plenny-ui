<script setup lang="ts">
  import { ref, watchEffect, type PropType } from 'vue';
  import { useComponentExpander } from '../../Composables/UseComponentExpander';
  import HubDropdown from '../Dropdown/HubDropdown.vue';

  const slots = defineSlots<{
    default(props: {}): any,
  }>();

  defineProps({
    reversed: { type: Boolean as PropType<boolean>, required: false, default: false },
  });

  const htmlGroup = ref<HTMLDivElement>();
  const children = ref(slots.default && slots.default({}));

  const { visible, hidden } = useComponentExpander(htmlGroup, children);

  // Watch for effects on component. This will help with reactive elements
  // within the group, e.g. button which changes its disabled state.
  watchEffect(() => {
    children.value = slots.default && slots.default({});
  });
</script>
<template>
  <div ref="htmlGroup" class="app-button-group" :class="{ reversed }">
    <template v-for="{ key, node } in visible" :key="key">
      <component :is="node"/>
    </template>
    <HubDropdown v-if="hidden.length > 0">
      <template v-for="{ key, node } in hidden" :key="key">
        <component :is="node"/>
      </template>
    </HubDropdown>
  </div>
</template>
<style scoped lang="scss">
  .app-button-group {
    flex: 1 1 32px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    min-width: 32px;
    max-width: 100%;
    height: 32px;

    //overflow: hidden;

    &.reversed {
      flex-direction: row-reverse;
    }
  }
</style>

