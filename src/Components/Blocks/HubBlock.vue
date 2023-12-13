<script setup lang="ts">
  import type { BlockName, BlockContext } from '../../Services/HubBlockManager';
  import { HubBlockManager } from '../../Services/HubBlockManager';
  import { computed, onUnmounted } from 'vue';

  interface Props {
    name: BlockName;
    context: BlockContext;
  }

  const props = defineProps<Props>();

  HubBlockManager.create(props.name, props.context);

  const block = computed(() => {
    return HubBlockManager.resolve(props.name);
  });

  onUnmounted(() => {
    HubBlockManager.cleanup(props.name);
  });
</script>
<template>
  <template v-for="child in block.children">
    <component :is="child" v-bind="block.context"/>
  </template>
</template>
