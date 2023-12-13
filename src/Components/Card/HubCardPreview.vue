<script setup lang="ts">

</script>
<template>
  <div class="card-preview">
    <slot />
  </div>
</template>
<style scoped lang="scss">
  .card-preview {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: var(--size12);
    line-height: 32px;

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.15), transparent);
      background-size: 100% 400%;
      background-position: 0 200%;
      background-repeat: no-repeat;
      transition-timing-function: var(--v-curve-easy-ease);
      transition-duration: var(--v-duration-slow);
      transition-property: background-position;
    }

    :deep(img) {
      object-fit: cover;
      object-position: center;
    }
  }
</style>
