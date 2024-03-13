<script setup lang="ts">
  defineSlots<{
    default(): any;
    more(): any;
  }>();
</script>
<template>
  <div class="card-footer">
    <div class="actions">
      <slot />
    </div>
    <div class="more" v-if="$slots.more">
      <slot name="more" />
    </div>
  </div>
</template>
<style scoped lang="scss">
  .card-footer {
    display: flex;
    flex: 1 1 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    line-height: 32px;
    min-width: 0;

    .actions {
      flex: 1 1 auto;
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 12px;
    }

    .more {
      flex: 0 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .card.horizontal {
    .card-footer {
      flex: 0 0 auto;
    }
  }
</style>
