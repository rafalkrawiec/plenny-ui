<script setup lang="ts">

</script>
<template>
  <div class="avatar-group">
    <slot/>
  </div>
</template>
<style scoped lang="scss">
  .avatar-group {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;

    :deep(.avatar) {
      box-shadow: 0 0 0 2px var(--themeNeutralBackground);

      &:not(:first-child) {
        margin-left: -2px;
      }
    }
  }
</style>
